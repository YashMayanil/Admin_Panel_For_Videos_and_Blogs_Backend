import { HttpContext } from "@adonisjs/core/http";
import db from '@adonisjs/lucid/services/db'

export default class SavedVideosController {
    // fetches all saved videos according to user
  async index({ authenticatedUser, response, logger }: HttpContext) {
    try {
      const user = await db
        .from('users')
        .where('firebase_uid', authenticatedUser.uid)
        .select('id')
        .first()

      if (!user) {
        return response.notFound({ message: 'User not found' })
      }

      const videos = await db
        .from('saved_videos')
        .where('user_id', user.id)
        .orderBy('created_at', 'desc')

      return response.ok({ data: videos })
    } catch (error) {
      logger.error({ err: error }, 'Failed to fetch saved videos')
      return response.internalServerError({
        message: 'Unable to fetch saved videos',
      })
    }
  }

  // this is for storing the Videos in backend 
  async store({ authenticatedUser, request, response, logger }: HttpContext) {
    const videoId = String(request.input('videoId', '')).trim()
    const title = String(request.input('title', '')).trim()
    const thumbnail = request.input('thumbnail', null)
    const channelName = request.input('channelName', null)
    const videoUrl = String(request.input('videoUrl', '')).trim()

    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return response.badRequest({ message: 'Invalid YouTube video ID' })
    }

    if (!title || title.length > 500 || !videoUrl) {
      return response.badRequest({
        message: 'A valid video title and URL are required',
      })
    }

    if (thumbnail !== null && typeof thumbnail !== 'string') {
      return response.badRequest({ message: 'Invalid thumbnail' })
    }

    if (channelName !== null && typeof channelName !== 'string') {
      return response.badRequest({ message: 'Invalid channel name' })
    }

    if (
      (typeof thumbnail === 'string' && thumbnail.length > 2048) ||
      (typeof channelName === 'string' && channelName.length > 255)
    ) {
      return response.badRequest({ message: 'Video metadata is too long' })
    }

    try {
      const parsedUrl = new URL(videoUrl)

      if (
        parsedUrl.protocol !== 'https:' ||
        parsedUrl.hostname !== 'www.youtube.com' ||
        parsedUrl.pathname !== `/watch` ||
        parsedUrl.searchParams.get('v') !== videoId
      ) {
        return response.badRequest({ message: 'Invalid YouTube video URL' })
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
        .table('saved_videos')
        .insert({
          user_id: user.id,
          video_id: videoId,
          title,
          thumbnail,
          channel_name: channelName,
          video_url: videoUrl,
        })
        .onConflict(['user_id', 'video_id'])
        .ignore()

      const savedVideo = await db
        .from('saved_videos')
        .where('user_id', user.id)
        .where('video_id', videoId)
        .first()

      return response.ok({
        message: 'Video saved successfully',
        data: savedVideo,
      })
    } catch (error) {
      logger.error({ err: error }, 'Failed to save video')
      return response.internalServerError({
        message: 'Unable to save video',
      })
    }
  }

  // this is used to unsave video 
  async unsave({
    authenticatedUser,
    params,
    response,
    logger,
  }: HttpContext) {
    const videoId = String(params.videoId ?? '')

    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return response.badRequest({ message: 'Invalid YouTube video ID' })
    }

    try {
      const user = await db
        .from('users')
        .where('firebase_uid', authenticatedUser.uid)
        .select('id')
        .first()

      if (!user) {
        return response.notFound({ message: 'User not found' })
      }

      const deletedCount = await db
        .from('saved_videos')
        .where('user_id', user.id)
        .where('video_id', videoId)
        .delete()

      if (!deletedCount) {
        return response.notFound({ message: 'Saved video not found' })
      }

      return response.ok({ message: 'Video unsaved successfully' })
    } catch (error) {
      logger.error({ err: error }, 'Failed to unsave video')
      return response.internalServerError({
        message: 'Unable to unsave video',
      })
    }
  }
}
