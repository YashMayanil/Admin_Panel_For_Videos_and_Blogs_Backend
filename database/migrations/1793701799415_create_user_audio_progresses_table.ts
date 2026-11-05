import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_audio_progress'

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

      table.integer('book_id').unsigned().notNullable()
      table.integer('chapter_id').unsigned().notNullable()
      table.integer('page_id').unsigned().notNullable()
      table.integer('audio_progress').notNullable().defaultTo(0)
      table.integer('chapter_audio_id').unsigned().notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.unique(['user_id', 'book_id', 'chapter_id', 'page_id', 'chapter_audio_id'])

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