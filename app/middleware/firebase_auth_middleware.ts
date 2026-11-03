
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { firebaseAuth } from '#services/firebase'

export default class FirebaseAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authorization = ctx.request.header('authorization')

    if (!authorization?.startsWith('Bearer ')) {
      return ctx.response.unauthorized({
        message: 'Authentication token is required',
      })
    }

    const token = authorization.slice('Bearer '.length).trim()

    if (!token) {
      return ctx.response.unauthorized({
        message: 'Authentication token is required',
      })
    }

    try {
      const decodedToken = await firebaseAuth.verifyIdToken(token)
      ctx.authenticatedUser = decodedToken

      return await next()
    } catch {
      return ctx.response.unauthorized({
        message: 'Invalid or expired authentication token',
      })
    }
  }
}
