
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Domain from '#models/domain'
import SeriesVideosProgress from '#models/series_videos_progress'
import { DateTime } from 'luxon'

export default class Series extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare domainId: number

  @column()
  declare description: string | null

  @column()
  declare thumbnail: Record<string, any> | null

  @column()
  declare videoDuration: number | null

  @column()
  declare videoSrc: string | null

  @column()
  declare previewVideo: string | null

  @column()
  declare tags: string[] | null

  @column()
  declare isHidden: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Domain)
  declare domain: BelongsTo<typeof Domain>

  @hasMany(() => SeriesVideosProgress)
  declare videoProgressRecords: HasMany<typeof SeriesVideosProgress>
}
