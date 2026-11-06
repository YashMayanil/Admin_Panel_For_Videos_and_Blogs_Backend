import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_blog_progress'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('blog_id')
        .notNullable()
        .references('id')
        .inTable('blogs')
        .onDelete('CASCADE')

      table.integer('reading_progress').notNullable().defaultTo(0)

      table.integer('last_scroll_position').notNullable().defaultTo(0)

      table.boolean('is_completed').notNullable().defaultTo(false)

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // One progress record per user per blog
      table.unique(['user_id', 'blog_id'])

      table.index(['user_id'])
      table.index(['blog_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}