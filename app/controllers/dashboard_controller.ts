
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async stats({ authenticatedUser, response, logger }: HttpContext) {
    try {
      // Find the logged-in user's database ID.
      const user = await db
        .from('users')
        .where('firebase_uid', authenticatedUser.uid)
        .select('id')
        .first()

      if (!user) {
        return response.notFound({ message: 'User not found' })
      }

      // Count watched videos, read blogs, and saved content in parallel.
      const [
        videosResult,
        blogsResult,
        savedVideosResult,
        savedBlogsResult,
      ] = await Promise.all([
        db
          .from('activities')
          .where('user_id', user.id)
          .where('content_type', 'video')
          .count('* as total')
          .first(),

        db
          .from('activities')
          .where('user_id', user.id)
          .where('content_type', 'blog')
          .count('* as total')
          .first(),

        db
          .from('saved_videos')
          .where('user_id', user.id)
          .count('* as total')
          .first(),

        db
          .from('saved_blogs')
          .where('user_id', user.id)
          .count('* as total')
          .first(),
      ])

      return response.ok({
        data: {
          videosWatched: Number(videosResult?.total ?? 0),
          blogsRead: Number(blogsResult?.total ?? 0),
          savedVideos: Number(savedVideosResult?.total ?? 0),
          savedBlogs: Number(savedBlogsResult?.total ?? 0),
        },
      })
    } catch (error) {
      logger.error({ err: error }, 'Failed to fetch dashboard statistics')

      return response.internalServerError({
        message: 'Unable to fetch dashboard statistics',
      })
    }
  }
}
