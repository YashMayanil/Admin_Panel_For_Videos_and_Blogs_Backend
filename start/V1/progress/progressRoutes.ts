import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import throttle from '#start/limiter'
import ProgressController from '#controllers/progresses_controller'

export default function progressRoutes() {
  router
    .group(() => {
      router.get('/videos/:seriesId', [ProgressController, 'getVideoProgress'])
      router.put('/videos/:seriesId', [ProgressController, 'updateVideoProgress'])
      router.get('/blogs/:blogId', [ProgressController, 'getBlogProgress'])
      router.put('/blogs/:blogId', [ProgressController, 'updateBlogProgress'])
    })
    .prefix('/progress')
    .use(middleware.firebaseAuth())
    .use(throttle)
}

