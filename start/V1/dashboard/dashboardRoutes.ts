import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import throttle from '#start/limiter'
import DashboardController from '#controllers/dashboard_controller'

export default function dashboardRoutes() {
  router
    .get('/dashboard/stats', [DashboardController, 'stats'])
    .use(middleware.firebaseAuth())
    .use(throttle)
}

