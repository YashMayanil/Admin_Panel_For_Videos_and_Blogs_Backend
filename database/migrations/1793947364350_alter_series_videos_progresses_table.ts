import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'series_videos_progress'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('last_position_seconds').notNullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('last_position_seconds')
    })
  }
}