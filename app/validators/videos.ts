import vine from '@vinejs/vine'

export const searchVideosValidator = vine.create({
  q: vine.string().trim().minLength(2).maxLength(150),
})

export const showVideoValidator = vine.create({
  videoId: vine.string().regex(/^[a-zA-Z0-9_-]{11}$/),
})
