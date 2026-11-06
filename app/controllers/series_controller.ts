import Series from '#models/series'
import type { HttpContext } from '@adonisjs/core/http'
import { createSeriesValidator, updateSeriesValidator } from '#validators/series'
import Domain from '#models/domain'
import { DateTime } from 'luxon'


export default class SeriesController {

    async index({ request, response }: HttpContext) {
        const page = Math.max(1, Number(request.input('page', 1)) || 1)
        const limit = Math.min(
            50,
            Math.max(1, Number(request.input('limit', 10)) || 10)
        )

        const domainIdInput = request.input('domainId')
        const domainId =
            domainIdInput !== undefined ? Number(domainIdInput) : undefined

        if (
            domainId !== undefined &&
            (!Number.isInteger(domainId) || domainId <= 0)
        ) {
            return response.badRequest({
                message: 'Invalid domainId',
            })
        }

        const query = Series.query()
            .whereNull('deleted_at')
            .preload('domain')
            .orderBy('created_at', 'desc')

        if (domainId !== undefined) {
            query.where('domain_id', domainId)
        }

        const series = await query.paginate(page, limit)

        return response.ok(series)
    }


    async store({ request, response }: HttpContext) {
        try {
            // 1. Validate incoming data
            const payload = await request.validateUsing(createSeriesValidator)

            // 2. Check whether the domain exists
            const domain = await Domain.query()
                .where('id', payload.domainId)
                .whereNull('deleted_at')
                .first()

            if (!domain) {
                return response.notFound({
                    success: false,
                    message: 'Domain not found',
                })
            }

            // 3. Create video record
            const series = await Series.create({
                ...payload,
                tags: payload.tags
                    ? (JSON.stringify(payload.tags) as unknown as string[])
                    : null,
            })

            // 4. Load associated domain
            await series.load('domain')

            return response.created({
                success: true,
                message: 'Video created successfully',
                data: series,
            })
        } catch (error) {
            console.error('Create series error:', error)
            throw error
        }
    }


    async show({ params, response }: HttpContext) {
        try {
            const id = Number(params.id)

            // Check whether ID is valid
            if (!Number.isInteger(id) || id <= 0) {
                return response.badRequest({
                    success: false,
                    message: 'Invalid series ID',
                })
            }

            // Find video by ID
            const series = await Series.query()
                .where('id', id)
                .whereNull('deleted_at')
                .preload('domain')
                .first()

            // Check whether video exists
            if (!series) {
                return response.notFound({
                    success: false,
                    message: 'Series not found',
                })
            }

            return response.ok({
                success: true,
                message: 'Series fetched successfully',
                data: series,
            })
        } catch (error) {
            console.error('Fetch series details error:', error)
            throw error
        }
    }


    async update({ params, request, response }: HttpContext) {
        try {
            // 1. Validate ID
            const id = Number(params.id)

            if (!Number.isInteger(id) || id <= 0) {
                return response.badRequest({
                    success: false,
                    message: 'Invalid series ID',
                })
            }

            // 2. Validate incoming data
            const payload = await request.validateUsing(updateSeriesValidator)

            if (Object.keys(payload).length === 0) {
                return response.badRequest({
                    success: false,
                    message: 'At least one field is required to update',
                })
            }

            // 3. Find existing video
            const series = await Series.query()
                .where('id', id)
                .whereNull('deleted_at')
                .first()

            if (!series) {
                return response.notFound({
                    success: false,
                    message: 'Series not found',
                })
            }

            // 4. Verify domain if domainId is being updated
            if (payload.domainId !== undefined) {
                const domain = await Domain.query()
                    .where('id', payload.domainId)
                    .whereNull('deleted_at')
                    .first()

                if (!domain) {
                    return response.notFound({
                        success: false,
                        message: 'Domain not found',
                    })
                }
            }

            // 5. Update video
            series.merge({
                ...payload,
                ...(payload.tags !== undefined && {
                    tags: JSON.stringify(payload.tags) as unknown as string[],
                }),
            })

            await series.save()

            // 6. Load associated domain
            await series.load('domain')

            return response.ok({
                success: true,
                message: 'Series updated successfully',
                data: series,
            })
        } catch (error) {
            console.error('Update series error:', error)
            throw error
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            // 1. Validate ID
            const id = Number(params.id)

            if (!Number.isInteger(id) || id <= 0) {
                return response.badRequest({
                    success: false,
                    message: 'Invalid series ID',
                })
            }

            // 2. Find existing video
            const series = await Series.query()
                .where('id', id)
                .whereNull('deleted_at')
                .first()

            if (!series) {
                return response.notFound({
                    success: false,
                    message: 'Series not found',
                })
            }

            // 3. Soft delete
            series.deletedAt = DateTime.now()
            await series.save()

            return response.ok({
                success: true,
                message: 'Series deleted successfully',
            })
        } catch (error) {
            console.error('Delete series error:', error)
            throw error
        }
    }
}
