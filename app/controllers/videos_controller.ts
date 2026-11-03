import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import { searchVideosValidator, showVideoValidator } from '#validators/videos'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export default class VideosController {
  async search({ request, response }: HttpContext) {
    const { q: query } = await request.validateUsing(searchVideosValidator, {
      data: { q: request.qs().q },
    })

    try {
      const params = new URLSearchParams({
        engine: 'youtube',
        search_query: query,
        api_key: env.get('SERPAPI_API_KEY'),
      })

      const apiResponse = await fetch(`https://serpapi.com/search.json?${params.toString()}`)

      if (!apiResponse.ok) {
        return response.status(502).send({
          message: 'YouTube search service is unavailable',
        })
      }

      const result: unknown = await apiResponse.json()

      if (!isRecord(result)) {
        return response.status(502).send({
          message: 'YouTube search returned an invalid response',
        })
      }

      if (result.error) {
        return response.status(502).send({
          message: 'YouTube search failed',
        })
      }

      return response.ok({
        data: Array.isArray(result.video_results) ? result.video_results : [],
        pagination: {
          nextPageToken: isRecord(result.serpapi_pagination)
            ? (result.serpapi_pagination.next_page_token ?? null)
            : null,
        },
      })
    } catch {
      return response.status(502).send({
        message: 'Unable to reach the YouTube search service',
      })
    }
  }

  async show({ params, request, response }: HttpContext) {
    const { videoId } = await request.validateUsing(showVideoValidator, {
      data: { videoId: params.videoId },
    })

    try {
      const searchParams = new URLSearchParams({
        engine: 'youtube_video',
        v: videoId,
        api_key: env.get('SERPAPI_API_KEY'),
      })

      const apiResponse = await fetch(`https://serpapi.com/search.json?${searchParams.toString()}`)

      if (!apiResponse.ok) {
        return response.status(502).send({
          message: 'Video service is unavailable',
        })
      }

      const result: unknown = await apiResponse.json()

      if (!isRecord(result)) {
        return response.status(502).send({
          message: 'Video service returned an invalid response',
        })
      }

      if (result.error) {
        return response.status(502).send({
          message: 'Unable to fetch video details',
        })
      }

      return response.ok({
        data: result,
      })
    } catch {
      return response.status(502).send({
        message: 'Unable to reach the video service',
      })
    }
  }
}
