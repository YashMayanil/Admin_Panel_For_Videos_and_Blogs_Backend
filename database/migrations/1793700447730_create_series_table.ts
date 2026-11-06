
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'series'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('domain_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('domains')
        .onDelete('RESTRICT')

      table.string('title').notNullable()
      table.string('thumbnail').nullable()
      table.text('description').nullable()
      table.string('video_duration').nullable()
      table.text('video_src').nullable()
      table.string('preview_video').nullable()
      table.jsonb('tags').nullable()

      table.boolean('is_hidden').notNullable().defaultTo(false)

      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(this.now())

      table
        .timestamp('updated_at', { useTz: true })
        .notNullable()
        .defaultTo(this.now())

      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.index(['domain_id'])
      table.index(['is_hidden'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
