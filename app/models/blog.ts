import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Domain from '#models/domain'

export default class Blog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare thumbnail: Record<string, any> | null

  @column()
  declare readTime: number

  @column()
  declare tags: string[] | null

  @column()
  declare isHidden: boolean

  @column()
  declare createdBy: string | null

  @column()
  declare domainId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Domain)
  declare domain: BelongsTo<typeof Domain>
}