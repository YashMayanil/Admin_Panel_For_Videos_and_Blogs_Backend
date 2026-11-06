import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import throttle from '#start/limiter'
import SavedVideosController from '#controllers/save_video_controller'

export default function savedVideoRoutes() {
  router
    .group(() => {
      router.get('/videos', [SavedVideosController, 'index'])
      router.post('/videos', [SavedVideosController, 'store'])
      router.delete('/videos/:videoId', [SavedVideosController, 'unsave'])
    })
    .prefix('/saved')
    .use(middleware.firebaseAuth())
    .use(throttle)
}

