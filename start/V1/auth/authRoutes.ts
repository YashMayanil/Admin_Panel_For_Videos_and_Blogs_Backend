import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import AuthController from '#controllers/auth_controller'

export default function authRoutes() {
  router
    .group(() => {
      // Email/password signup & login
      router.post('/signup', [controllers.NewAccount, 'store'])
      router.post('/login', [controllers.AccessTokens, 'store'])

      // Firebase sync & current user
      router.post('/sync', [AuthController, 'sync']).use(middleware.firebaseAuth())
      router.get('/me', [AuthController, 'me']).use(middleware.firebaseAuth())
    })
    .prefix('/auth')
}

