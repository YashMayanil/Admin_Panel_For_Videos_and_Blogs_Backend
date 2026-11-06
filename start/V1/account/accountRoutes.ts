import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'

export default function accountRoutes() {
  router
    .group(() => {
      router.get('/profile', [controllers.Profile, 'show'])
      router.post('/logout', [controllers.AccessTokens, 'destroy'])
    })
    .prefix('/account')
    .use(middleware.auth())
}

