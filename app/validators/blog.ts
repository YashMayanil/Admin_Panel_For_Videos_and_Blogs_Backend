import vine from '@vinejs/vine'

export const createBlogValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    content: vine.string().trim().minLength(1),
    domainId: vine.number().positive(),
    readTime: vine.number().positive().optional(),
    thumbnail: vine.any().optional(),
    tags: vine.array(vine.string()).optional(),
    isHidden: vine.boolean().optional(),
  })
)

export const updateBlogValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    content: vine.string().trim().minLength(1).optional(),
    domainId: vine.number().positive().optional(),
    readTime: vine.number().positive().optional(),
    thumbnail: vine.any().optional(),
    tags: vine.array(vine.string()).optional(),
    isHidden: vine.boolean().optional(),
  })
)