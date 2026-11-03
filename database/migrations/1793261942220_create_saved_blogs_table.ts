
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'saved_blogs'

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

      table.integer('blog_id').unsigned().notNullable()
      table.string('title', 500).notNullable()
      table.text('body').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.unique(['user_id', 'blog_id'])
      table.index(['user_id', 'created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
