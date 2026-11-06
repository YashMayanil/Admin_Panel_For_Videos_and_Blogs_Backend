import Blog from '#models/blog'
import type { HttpContext } from '@adonisjs/core/http'
import Domain from '#models/domain'
import { DateTime } from 'luxon'
import { createBlogValidator, updateBlogValidator } from '#validators/blog'

// this controller if for fetching blogs from external api and doing pagination
export default class BlogsController {

  async index({ request, response }: HttpContext) {
    const page = Math.max(1, Number(request.input('page', 1)) || 1)
    const limit = Math.min(
      50,
      Math.max(1, Number(request.input('limit', 10)) || 10)
    )

    const domainIdInput = request.input('domainId')
    const domainId =
      domainIdInput !== undefined ? Number(domainIdInput) : undefined

    if (
      domainId !== undefined &&
      (!Number.isInteger(domainId) || domainId <= 0)
    ) {
      return response.badRequest({
        message: 'Invalid domainId',
      })
    }

    const query = Blog.query()
      .whereNull('deleted_at')
      .preload('domain')
      .orderBy('created_at', 'desc')

    if (domainId !== undefined) {
      query.where('domain_id', domainId)
    }

    const blogs = await query.paginate(page, limit)

    return response.ok(blogs)
  }


  // this api is for fetching blog by id from external api
  async show({ params, response }: HttpContext) {
    try {
      const blog = await Blog.query()
        .where('id', params.id)
        .whereNull('deleted_at')
        .preload('domain')
        .first()

      if (!blog) {
        return response.status(404).json({
          success: false,
          message: 'Blog not found',
        })
      }

      return response.ok({
        success: true,
        message: 'Blog fetched successfully',
        data: blog,
      })
    } catch (error) {
      console.error('Fetch blog error:', error)
      throw error
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      // 1. Validate incoming data
      const payload = await request.validateUsing(createBlogValidator)

      // 2. Check whether domain exists
      const domain = await Domain.query()
        .where('id', payload.domainId)
        .whereNull('deleted_at')
        .first()

      if (!domain) {
        return response.status(404).json({
          success: false,
          message: 'Domain not found',
        })
      }

      // 3. Create blog
      const blog = await Blog.create({
        ...payload,
        tags: payload.tags
          ? (JSON.stringify(payload.tags) as unknown as string[])
          : null,
      })

      // 4. Load domain relationship
      await blog.load('domain')

      return response.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: blog,
      })
    } catch (error) {
      console.error('Create blog error:', error)
      throw error
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateBlogValidator)

      if (Object.keys(payload).length === 0) {
        return response.status(422).json({
          success: false,
          message: 'At least one field is required',
        })
      }

      const blog = await Blog.query()
        .where('id', params.id)
        .whereNull('deleted_at')
        .first()

      if (!blog) {
        return response.status(404).json({
          success: false,
          message: 'Blog not found',
        })
      }

      if (payload.domainId !== undefined) {
        const domain = await Domain.query()
          .where('id', payload.domainId)
          .whereNull('deleted_at')
          .first()

        if (!domain) {
          return response.status(404).json({
            success: false,
            message: 'Domain not found',
          })
        }
      }

      blog.merge({
        ...payload,
        ...(payload.tags !== undefined && {
          tags: JSON.stringify(payload.tags) as unknown as string[],
        }),
      })

      await blog.save()
      await blog.load('domain')

      return response.ok({
        success: true,
        message: 'Blog updated successfully',
        data: blog,
      })
    } catch (error) {
      console.error('Update blog error:', error)
      throw error
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const blog = await Blog.query()
        .where('id', params.id)
        .whereNull('deleted_at')
        .first()

      if (!blog) {
        return response.status(404).json({
          success: false,
          message: 'Blog not found',
        })
      }

      blog.deletedAt = DateTime.now()
      await blog.save()

      return response.ok({
        success: true,
        message: 'Blog deleted successfully',
      })
    } catch (error) {
      console.error('Delete blog error:', error)
      throw error
    }
  }
}
