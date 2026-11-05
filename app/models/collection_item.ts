import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
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

  @belongsTo(() => Collection)
  declare collection: BelongsTo<typeof Collection>
}