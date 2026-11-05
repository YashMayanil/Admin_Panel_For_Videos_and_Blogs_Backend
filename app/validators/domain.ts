
import vine from '@vinejs/vine'

export const createDomainValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),

    slug: vine.string().trim().minLength(2).maxLength(100),

    description: vine.string().trim().optional(),
  })
)

export const updateDomainValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),

    slug: vine.string().trim().minLength(2).maxLength(100).optional(),

    description: vine.string().trim().optional(),
  })
)
