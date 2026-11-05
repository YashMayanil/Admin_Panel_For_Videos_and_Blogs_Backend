import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_chapter_progress'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('book_id')
        .unsigned()
        .notNullable()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.integer('page_id').notNullable()
      table.integer('chapter_video_id').notNullable()
      table.integer('video_progress').notNullable().defaultTo(0)

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.unique(['user_id', 'book_id', 'page_id', 'chapter_video_id'])
      table.index(['user_id', 'book_id'])
      table
        .integer('activities_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('activities')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}