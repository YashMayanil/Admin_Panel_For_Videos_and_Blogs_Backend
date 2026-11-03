
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SavedBlogsController {
    //use for fetching all blogs which is saved
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

      const blogs = await db
        .from('saved_blogs')
        .where('user_id', user.id)
        .orderBy('created_at', 'desc')

      return response.ok({ data: blogs })
    } catch (error) {
      logger.error({ err: error }, 'Failed to fetch saved blogs')
      return response.internalServerError({
        message: 'Unable to fetch saved blogs',
      })
    }
  }

  //use for save blogs
  async store({ authenticatedUser, request, response, logger }: HttpContext) {
    const blogId = Number(request.input('blogId'))
    const title = String(request.input('title', '')).trim()
    const body = request.input('body', null)

    if (!Number.isSafeInteger(blogId) || blogId < 1) {
      return response.badRequest({ message: 'Invalid blog ID' })
    }

    if (!title || title.length > 500) {
      return response.badRequest({ message: 'A valid blog title is required' })
    }

    if (body !== null && typeof body !== 'string') {
      return response.badRequest({ message: 'Invalid blog body' })
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

      await db
        .table('saved_blogs')
        .insert({
          user_id: user.id,
          blog_id: blogId,
          title,
          body,
        })
        .onConflict(['user_id', 'blog_id'])
        .ignore()

      const savedBlog = await db
        .from('saved_blogs')
        .where('user_id', user.id)
        .where('blog_id', blogId)
        .first()

      return response.ok({
        message: 'Blog saved successfully',
        data: savedBlog,
      })
    } catch (error) {
      logger.error({ err: error }, 'Failed to save blog')
      return response.internalServerError({
        message: 'Unable to save blog',
      })
    }
  }

  // unsave a blog
  async destroy({ authenticatedUser, params, response, logger }: HttpContext) {
    const blogId = Number(params.blogId)

    if (!Number.isSafeInteger(blogId) || blogId < 1) {
      return response.badRequest({ message: 'Invalid blog ID' })
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
        .from('saved_blogs')
        .where('user_id', user.id)
        .where('blog_id', blogId)
        .delete()

      if (!deletedCount) {
        return response.notFound({ message: 'Saved blog not found' })
      }

      return response.ok({ message: 'Blog unsaved successfully' })
    } catch (error) {
      logger.error({ err: error }, 'Failed to unsave blog')
      return response.internalServerError({
        message: 'Unable to unsave blog',
      })
    }
  }
}
