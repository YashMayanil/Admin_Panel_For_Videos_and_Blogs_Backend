import type { HttpContext } from '@adonisjs/core/http'
import Domain from '#models/domain'
import { DateTime } from 'luxon'
import {
    createDomainValidator,
    updateDomainValidator,
} from '#validators/domain'

export default class DomainController {
    // this controller is for fetching all domains.
    async index({ response }: HttpContext) {
        try {
            const domains = await Domain.query()
                .whereNull('deleted_at')
                .orderBy('created_at', 'desc')

            return response.status(200).json({
                success: true,
                message: 'Domains fetched successfully',
                data: domains,
            })
        } catch (error) {
            console.error('Fetch domains error:', error)

            return response.status(500).json({
                success: false,
                message: 'Failed to fetch domains',
            })
        }
    }

    // this controller is for fetching a single domain. 
    async show({ params, response }: HttpContext) {
        try {
            const domain = await Domain.query()
                .where('id', params.id)
                .whereNull('deleted_at')
                .first()

            if (!domain) {
                return response.status(404).json({
                    success: false,
                    message: 'Domain not found',
                })
            }

            return response.status(200).json({
                success: true,
                message: 'Domain fetched successfully',
                data: domain,
            })
        } catch (error) {
            console.error('Fetch domain error:', error)

            return response.status(500).json({
                success: false,
                message: 'Failed to fetch domain',
            })
        }
    }

    // this controller is for creating a domain.
    //handling duplicate name and slug
    async store({ request, response }: HttpContext) {
        try {
            // 1. Validate incoming data
            const payload = await request.validateUsing(createDomainValidator)

            //validate empty payload
            if (Object.keys(payload).length === 0) {
                return response.status(422).json({
                    success: false,
                    message: 'At least one field is required to update the domain',
                })
            }
            // 2. Check whether name or slug already exists
            const existingDomain = await Domain.query()
                .where((query) => {
                    query
                        .where('name', payload.name)
                        .orWhere('slug', payload.slug)
                })
                .first()

            if (existingDomain) {
                return response.status(409).json({
                    success: false,
                    message: 'A domain with this name or slug already exists',
                })
            }

            // 3. Create domain
            const domain = await Domain.create(payload)

            return response.status(201).json({
                success: true,
                message: 'Domain created successfully',
                data: domain,
            })
        } catch (error) {
            // Handle PostgreSQL unique constraint violation
            if (
                error &&
                typeof error === 'object' &&
                'code' in error &&
                error.code === '23505'
            ) {
                return response.status(409).json({
                    success: false,
                    message: 'A domain with this name or slug already exists',
                })
            }

            // Let AdonisJS handle validation and unexpected errors
            throw error
        }
    }


    // this controller is for updating a domain.
    async update({ params, request, response }: HttpContext) {
        try {
            // 1. Validate incoming data
            const payload = await request.validateUsing(updateDomainValidator)

            // 2. Find the existing domain
            const domain = await Domain.query()
                .where('id', params.id)
                .whereNull('deleted_at')
                .first()

            if (!domain) {
                return response.status(404).json({
                    success: false,
                    message: 'Domain not found',
                })
            }
            // 3. Check duplicates only if name or slug is being updated
            if (payload.name || payload.slug) {
                const existingDomain = await Domain.query()
                    .whereNot('id', domain.id)
                    .where((query) => {
                        if (payload.name) {
                            query.orWhere('name', payload.name)
                        }

                        if (payload.slug) {
                            query.orWhere('slug', payload.slug)
                        }
                    })
                    .first()

                if (existingDomain) {
                    return response.status(409).json({
                        success: false,
                        message: 'Another domain already uses this name or slug',
                    })
                }
            }

            // 4. Update domain
            domain.merge(payload)
            await domain.save()

            return response.status(200).json({
                success: true,
                message: 'Domain updated successfully',
                data: domain,
            })
        } catch (error) {
            // PostgreSQL unique constraint error
            if (
                error &&
                typeof error === 'object' &&
                'code' in error &&
                error.code === '23505'
            ) {
                return response.status(409).json({
                    success: false,
                    message: 'A domain with this name or slug already exists',
                })
            }

            throw error
        }
    }

    // this controller is for deleting a domain by id.
    async destroy({ params, response }: HttpContext) {
        try {
            const domain = await Domain.query()
                .where('id', params.id)
                .whereNull('deleted_at')
                .first()

            if (!domain) {
                return response.status(404).json({
                    success: false,
                    message: 'Domain not found',
                })
            }

            domain.deletedAt = DateTime.now()
            await domain.save()

            return response.status(200).json({
                success: true,
                message: 'Domain deleted successfully',
            })
        } catch (error) {
            console.error('Delete domain error:', error)

            return response.status(500).json({
                success: false,
                message: 'Failed to delete domain',
            })
        }
    }


}