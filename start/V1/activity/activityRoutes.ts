import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import throttle from '#start/limiter'
import ActivitiesController from '#controllers/activity_controller'

export default function activityRoutes() {
  router
    .group(() => {
      router.get('/', [ActivitiesController, 'index'])
      router.post('/', [ActivitiesController, 'store'])
    })
    .prefix('/activity')
    .use(middleware.firebaseAuth())
    .use(throttle)
}

