import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

//this controller is for fetch user activity 
export default class ActivitiesController {
  async index({ authenticatedUser, response, logger, request }: HttpContext) {
    try {
      const user = await db
        .from('users')
        .where('firebase_uid', authenticatedUser.uid)
        .select('id')
        .first()

      if (!user) {
        return response.notFound({ message: 'User not found' })
      }
      //this is for pagination logic showing only 20 activity attime 
      const limit = Math.min(Math.max(Number(request.input('limit', 20)) || 20, 1), 100)

      const activities = await db
        .from('activities')
        .where('user_id', user.id)
        .orderBy('last_viewed_at', 'desc')
        .limit(limit)

      return response.ok({ data: activities })
    } catch (error) {
      logger.error({ err: error }, 'Failed to fetch activity')
      return response.internalServerError({
        message: 'Unable to fetch recent activity',
      })
    }
  }

  // this controller is used for to store user activity..
  async store({ authenticatedUser, request, response, logger }: HttpContext) {
    const contentType = request.input('contentType')
    const contentId = String(request.input('contentId', '')).trim()
    const title = String(request.input('title', '')).trim()
    const thumbnail = request.input('thumbnail', null)
    const contentUrl = String(request.input('contentUrl', '')).trim()

    if (!['video', 'blog'].includes(contentType)) {
      return response.badRequest({
        message: 'contentType must be video or blog',
      })
    }

    if (!contentId || contentId.length > 100 || !title || title.length > 500) {
      return response.badRequest({
        message: 'A valid content ID and title are required',
      })
    }

    if (!contentUrl || contentUrl.length > 2048) {
      return response.badRequest({ message: 'A valid content URL is required' })
    }

    if (thumbnail !== null && typeof thumbnail !== 'string') {
      return response.badRequest({ message: 'Invalid thumbnail' })
    }

    if (typeof thumbnail === 'string' && thumbnail.length > 2048) {
      return response.badRequest({ message: 'Thumbnail URL is too long' })
    }

    try {
      if (contentType === 'blog') {
        const expectedPath = `/blogs/${contentId}`

        if (contentUrl !== expectedPath) {
          return response.badRequest({
            message: 'Invalid blog URL',
          })
        }
      }

      if (contentType === 'video') {
        let parsedUrl: URL

        try {
          parsedUrl = new URL(contentUrl)
        } catch {
          return response.badRequest({
            message: 'Invalid video URL',
          })
        }

        if (
          parsedUrl.hostname !== 'www.youtube.com' ||
          parsedUrl.pathname !== '/watch' ||
          parsedUrl.searchParams.get('v') !== contentId
        ) {
          return response.badRequest({
            message: 'Invalid video URL',
          })
        }
      }

      const user = await db
        .from('users')
        .where('firebase_uid', authenticatedUser.uid)
        .select('id')
        .first()

      if (!user) {
        return response.notFound({ message: 'User not found' })
      }

      await db
        .table('activities')
        .insert({
          user_id: user.id,
          content_type: contentType,
          content_id: contentId,
          title,
          thumbnail,
          content_url: contentUrl,
          last_viewed_at: new Date(),
        })
        .onConflict(['user_id', 'content_type', 'content_id'])
        .merge({
          title,
          thumbnail,
          content_url: contentUrl,
          last_viewed_at: new Date(),
        })

      const activity = await db
        .from('activities')
        .where('user_id', user.id)
        .where('content_type', contentType)
        .where('content_id', contentId)
        .first()

      return response.ok({
        message: 'Activity recorded successfully',
        data: activity,
      })
    } catch (error) {
      logger.error({ err: error }, 'Failed to record activity')
      return response.internalServerError({
        message: 'Unable to record activity',
      })
    }
  }
}
