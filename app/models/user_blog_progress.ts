import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import Blog from '#models/blog'

export default class UserBlogProgress extends BaseModel {
  static table = 'user_blog_progress'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare blogId: number

  @column()
  declare readingProgress: number

  @column()
  declare lastScrollPosition: number

  @column()
  declare isCompleted: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Blog)
  declare blog: BelongsTo<typeof Blog>
}