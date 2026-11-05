import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import Activity from '#models/activity'

export default class UserAudioProgress extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare bookId: number

  @column()
  declare chapterId: number

  @column()
  declare pageId: number

  @column()
  declare audioProgress: number

  @column()
  declare chapterAudioId: number

  @column()
  declare activitiesId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Activity, {
    foreignKey: 'activitiesId',
  })
  declare activity: BelongsTo<typeof Activity>
}