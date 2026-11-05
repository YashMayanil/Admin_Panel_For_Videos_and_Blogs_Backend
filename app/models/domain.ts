import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Blog from '#models/blog'
import Series from '#models/series'
import { DateTime } from 'luxon'

export default class Domain extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column.dateTime({ columnName: 'deleted_at' })
  declare deletedAt: DateTime | null

  @hasMany(() => Blog)
  declare blogs: HasMany<typeof Blog>

  @hasMany(() => Series)
  declare series: HasMany<typeof Series>
}