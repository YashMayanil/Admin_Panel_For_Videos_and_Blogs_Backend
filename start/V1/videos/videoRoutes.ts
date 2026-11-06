import router from '@adonisjs/core/services/router'
import VideosController from '#controllers/videos_controller'

export default function videoRoutes() {
  router
    .group(() => {
      router.get('/search', [VideosController, 'search'])
      router.get('/:videoId', [VideosController, 'show'])
    })
    .prefix('/videos')
}

