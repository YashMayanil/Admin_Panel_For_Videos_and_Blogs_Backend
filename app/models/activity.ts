import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import UserChapterProgress from '#models/user_chapter_progress'
import UserAudioProgress from '#models/user_audio_progress'

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare activitiesType: string

  @column()
  declare activitiesId: number

  @column()
  declare action: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasOne(() => UserChapterProgress, {
    foreignKey: 'activitiesId',
  })
  declare chapterProgress: HasOne<typeof UserChapterProgress>

  @hasOne(() => UserAudioProgress, {
    foreignKey: 'activitiesId',
  })
  declare audioProgress: HasOne<typeof UserAudioProgress>
}