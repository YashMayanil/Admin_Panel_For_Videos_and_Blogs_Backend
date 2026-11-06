import User from '#models/user'
import Blog from '#models/blog'
import Series from '#models/series'
import UserBlogProgress from '#models/user_blog_progress'
import SeriesVideosProgress from '#models/series_videos_progress'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProgressController {
  /**
   * Resolve Firebase-authenticated user to internal database user.
   */
  private async getUser(ctx: HttpContext) {
    const firebaseUid = ctx.authenticatedUser?.uid

    if (!firebaseUid) {
      return null
    }

    return User.findBy('firebaseUid', firebaseUid)
  }

  /**
   * Validate a route ID.
   */
  private parseId(value: string) {
    const id = Number(value)

    return Number.isSafeInteger(id) && id > 0 ? id : null
  }

  /**
   * getting video progress by id
   */
  async getVideoProgress(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Authenticated user not found',
      })
    }

    const seriesId = this.parseId(ctx.params.seriesId)

    if (!seriesId) {
      return ctx.response.badRequest({
        success: false,
        message: 'Invalid series ID',
      })
    }

    const series = await Series.query()
      .where('id', seriesId)
      .whereNull('deleted_at')
      .first()

    if (!series) {
      return ctx.response.notFound({
        success: false,
        message: 'Video not found',
      })
    }

    const progress = await SeriesVideosProgress.query()
      .where('user_id', user.id)
      .where('series_id', seriesId)
      .first()

    return ctx.response.ok({
      success: true,
      data: progress,
    })
  }

  /**
   * updating video progress by id
   */
  async updateVideoProgress(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Authenticated user not found',
      })
    }

    const seriesId = this.parseId(ctx.params.seriesId)

    if (!seriesId) {
      return ctx.response.badRequest({
        success: false,
        message: 'Invalid series ID',
      })
    }

    const series = await Series.query()
      .where('id', seriesId)
      .whereNull('deleted_at')
      .first()

    if (!series) {
      return ctx.response.notFound({
        success: false,
        message: 'Video not found',
      })
    }

    const { videoProgress, lastPositionSeconds } = ctx.request.body()

    if (
      !Number.isInteger(videoProgress) ||
      videoProgress < 0 ||
      videoProgress > 100
    ) {
      return ctx.response.badRequest({
        success: false,
        message: 'videoProgress must be an integer between 0 and 100',
      })
    }

    if (
      !Number.isInteger(lastPositionSeconds) ||
      lastPositionSeconds < 0
    ) {
      return ctx.response.badRequest({
        success: false,
        message: 'lastPositionSeconds must be a non-negative integer',
      })
    }

    const existingProgress = await SeriesVideosProgress.query()
      .where('user_id', user.id)
      .where('series_id', seriesId)
      .first()

    const progress = existingProgress
      ? await this.updateExistingVideoProgress(
          existingProgress,
          videoProgress,
          lastPositionSeconds
        )
      : await SeriesVideosProgress.create({
          userId: user.id,
          seriesId,
          videoProgress,
          lastPositionSeconds,
        })

    return ctx.response.ok({
      success: true,
      message: 'Video progress saved successfully',
      data: progress,
    })
  }

  private async updateExistingVideoProgress(
    progress: SeriesVideosProgress,
    videoProgress: number,
    lastPositionSeconds: number
  ) {
    progress.videoProgress = Math.max(
      progress.videoProgress,
      videoProgress
    )

    progress.lastPositionSeconds = lastPositionSeconds

    await progress.save()

    return progress
  }

  /**
   * getting blog progress by id
   */
  async getBlogProgress(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Authenticated user not found',
      })
    }

    const blogId = this.parseId(ctx.params.blogId)

    if (!blogId) {
      return ctx.response.badRequest({
        success: false,
        message: 'Invalid blog ID',
      })
    }

    const blog = await Blog.query()
      .where('id', blogId)
      .whereNull('deleted_at')
      .first()

    if (!blog) {
      return ctx.response.notFound({
        success: false,
        message: 'Blog not found',
      })
    }

    const progress = await UserBlogProgress.query()
      .where('user_id', user.id)
      .where('blog_id', blogId)
      .first()

    return ctx.response.ok({
      success: true,
      data: progress,
    })
  }

  /**
   * updating blog progress by id
   */
  async updateBlogProgress(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Authenticated user not found',
      })
    }

    const blogId = this.parseId(ctx.params.blogId)

    if (!blogId) {
      return ctx.response.badRequest({
        success: false,
        message: 'Invalid blog ID',
      })
    }

    const blog = await Blog.query()
      .where('id', blogId)
      .whereNull('deleted_at')
      .first()

    if (!blog) {
      return ctx.response.notFound({
        success: false,
        message: 'Blog not found',
      })
    }

    const { readingProgress, lastScrollPosition } = ctx.request.body()

    if (
      !Number.isInteger(readingProgress) ||
      readingProgress < 0 ||
      readingProgress > 100
    ) {
      return ctx.response.badRequest({
        success: false,
        message: 'readingProgress must be an integer between 0 and 100',
      })
    }

    if (
      !Number.isInteger(lastScrollPosition) ||
      lastScrollPosition < 0
    ) {
      return ctx.response.badRequest({
        success: false,
        message: 'lastScrollPosition must be a non-negative integer',
      })
    }

    const existingProgress = await UserBlogProgress.query()
      .where('user_id', user.id)
      .where('blog_id', blogId)
      .first()

    const highestProgress = Math.max(
      existingProgress?.readingProgress ?? 0,
      readingProgress
    )

    const isCompleted =
      existingProgress?.isCompleted === true || highestProgress >= 100

    const progress = existingProgress
      ? await this.updateExistingBlogProgress(
          existingProgress,
          highestProgress,
          lastScrollPosition,
          isCompleted
        )
      : await UserBlogProgress.create({
          userId: user.id,
          blogId,
          readingProgress: highestProgress,
          lastScrollPosition,
          isCompleted,
        })

    return ctx.response.ok({
      success: true,
      message: 'Blog progress saved successfully',
      data: progress,
    })
  }

  private async updateExistingBlogProgress(
    progress: UserBlogProgress,
    readingProgress: number,
    lastScrollPosition: number,
    isCompleted: boolean
  ) {
    progress.readingProgress = readingProgress
    progress.lastScrollPosition = lastScrollPosition
    progress.isCompleted = isCompleted

    await progress.save()

    return progress
  }
}
