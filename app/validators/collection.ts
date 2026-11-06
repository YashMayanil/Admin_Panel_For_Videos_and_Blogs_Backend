
import vine from '@vinejs/vine'

export const createCollectionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    description: vine.string().trim().optional(),
  })
)

export const updateCollectionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100).optional(),
    description: vine.string().trim().optional(),
  })
)

export const addCollectionItemValidator = vine.compile(
  vine.object({
    contentType: vine.enum(['series', 'blog']),
    contentId: vine.string().trim().minLength(1).maxLength(100),
  })
)
