import router from '@adonisjs/core/services/router'
import SeriesController from '#controllers/series_controller'

export default function seriesRoutes() {
  router
    .group(() => {
      router.get('/', [SeriesController, 'index'])
      router.post('/', [SeriesController, 'store'])
      router.get('/:id', [SeriesController, 'show'])
      router.put('/:id', [SeriesController, 'update'])
      router.delete('/:id', [SeriesController, 'destroy'])
    })
    .prefix('/series')
}

