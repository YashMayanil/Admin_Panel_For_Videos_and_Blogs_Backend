import type { HttpContext } from '@adonisjs/core/http'

interface BlogPost {
  userId: number
  id: number
  title: string
  body: string
}

// this controller if for fetching blogs from external api and doing pagination
export default class BlogsController {
  async index({ request, response }: HttpContext) {
    try {
      const page = Math.max(1, Number(request.input('page', 1)) || 1)
      const limit = Math.min(50, Math.max(1, Number(request.input('limit', 10)) || 10))

      const apiResponse = await fetch('https://jsonplaceholder.typicode.com/posts')

      if (!apiResponse.ok) {
        return response.status(502).send({
          message: 'Unable to fetch blogs from the external service',
        })
      }

      const posts = (await apiResponse.json()) as BlogPost[]

      const start = (page - 1) * limit
      const paginatedPosts = posts.slice(start, start + limit)

      return response.ok({
        data: paginatedPosts,
        pagination: {
          page,
          limit,
          total: posts.length,
          totalPages: Math.ceil(posts.length / limit),
        },
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Something went wrong while fetching blogs',
      })
    }
  }

  // this api is for fetching blog by id from external api
  async show({ params, response }: HttpContext) {
    const id = Number(params.id)

    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ message: 'Invalid blog ID' })
    }

    try {
      const apiResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

      if (apiResponse.status === 404) {
        return response.notFound({ message: 'Blog not found' })
      }

      if (!apiResponse.ok) {
        return response.status(502).send({
          message: 'Unable to fetch the blog',
        })
      }

      const post = (await apiResponse.json()) as BlogPost

      return response.ok({ data: post })
    } catch (error) {
      return response.internalServerError({
        message: 'Something went wrong while fetching the blog',
      })
    }
  }
}
