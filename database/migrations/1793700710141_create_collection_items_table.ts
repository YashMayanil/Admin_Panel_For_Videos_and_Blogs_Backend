import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collection_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('collection_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('collections')
        .onDelete('CASCADE')

      table.string('content_type', 50).notNullable()
      table.string('content_id', 100).notNullable()

      table.integer('progress').notNullable().defaultTo(0)

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.unique(['collection_id', 'content_type', 'content_id'])
      table.index(['content_type', 'content_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}