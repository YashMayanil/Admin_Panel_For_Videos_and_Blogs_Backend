import vine from '@vinejs/vine'

export const createSeriesValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(255),
        domainId: vine.number().positive(),
        description: vine.string().trim().optional(),
        thumbnail: vine.any().optional(),
        videoDuration: vine.number().positive().optional(),
        videoSrc: vine.string().trim().url(),
        previewVideo: vine.string().trim().optional(),
        tags: vine.array(vine.string()).optional(),
        isHidden: vine.boolean().optional(),
    })
)

export const updateSeriesValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(255).optional(),
        domainId: vine.number().positive().optional(),
        description: vine.string().trim().optional(),
        thumbnail: vine.any().optional(),
        videoDuration: vine.number().positive().optional(),
        videoSrc: vine.string().trim().url().optional(),
        previewVideo: vine.string().trim().optional(),
        tags: vine.array(vine.string()).optional(),
        isHidden: vine.boolean().optional(),
    })
)