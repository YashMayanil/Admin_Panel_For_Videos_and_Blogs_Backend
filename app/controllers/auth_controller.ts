
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AuthController {
    async sync({ authenticatedUser, response, logger }: HttpContext) {
        const firebaseUid = authenticatedUser.uid
        const email = authenticatedUser.email
        const fullName = authenticatedUser.name ?? null

        if (!email) {
            return response.badRequest({
                message: 'A verified Firebase email is required',
            })
        }

        try {
            const now = new Date()

            const [user] = await db
                .table('users')
                .insert({
                    firebase_uid: firebaseUid,
                    email,
                    full_name: fullName,
                    created_at: now,
                    updated_at: now,
                })
                .onConflict('firebase_uid')
                .merge({
                    email,
                    full_name: fullName,
                    updated_at: now,
                })
                .returning(['id', 'firebase_uid', 'email', 'full_name'])

            return response.ok({
                message: 'User synced successfully',
                user,
            })
        } catch (error) {
            logger.error({ err: error }, 'Failed to sync Firebase user')

            return response.internalServerError({
                message: 'Unable to sync user',
            })
        }
    }

    async me({ authenticatedUser, response }: HttpContext) {
        const user = await db
            .from('users')
            .where('firebase_uid', authenticatedUser.uid)
            .select('id', 'firebase_uid', 'email', 'full_name')
            .first()

        if (!user) {
            return response.notFound({ message: 'User not found' })
        }

        return response.ok({ user })
    }
}
