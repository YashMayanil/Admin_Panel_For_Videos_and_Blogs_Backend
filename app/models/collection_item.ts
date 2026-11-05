import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Collection from '#models/collection'

export default class CollectionItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare collectionId: number

  @column()
  declare contentType: string

  @column()
  declare contentId: string

  @column()
  declare progress: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => Collection)
  declare collection: BelongsTo<typeof Collection>
}