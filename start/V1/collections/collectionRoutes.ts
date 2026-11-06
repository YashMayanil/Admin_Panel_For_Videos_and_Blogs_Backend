import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import throttle from '#start/limiter'
import CollectionsController from '#controllers/collections_controller'

export default function collectionRoutes() {
  router
    .group(() => {
      router.get('/', [CollectionsController, 'index'])
      router.get('/:id', [CollectionsController, 'show'])
      router.post('/', [CollectionsController, 'store'])
      router.put('/:id', [CollectionsController, 'update'])
      router.delete('/:id', [CollectionsController, 'destroy'])

      router.post('/:id/items', [CollectionsController, 'addItem'])
      router.delete('/:id/items/:itemId', [CollectionsController, 'removeItem'])
    })
    .prefix('/collections')
    .use(middleware.firebaseAuth())
    .use(throttle)
}

