
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('content_type', 20).notNullable()
      table.string('content_id', 100).notNullable()
      table.string('title', 500).notNullable()
      table.text('thumbnail').nullable()
      table.text('content_url').notNullable()

      table.timestamp('last_viewed_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.unique(['user_id', 'content_type', 'content_id'])
      table.index(['user_id', 'last_viewed_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
