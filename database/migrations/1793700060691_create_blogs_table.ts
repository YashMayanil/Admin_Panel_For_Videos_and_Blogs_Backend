
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.jsonb('thumbnail').nullable()
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.string('read_time').nullable()
      table.jsonb('tags').nullable()

      table.boolean('is_hidden').notNullable().defaultTo(false)
      table.string('created_by').nullable()

      table
        .integer('domain_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('domains')
        .onDelete('RESTRICT')

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
      table.index(['created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
