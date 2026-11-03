
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'saved_videos'

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

      table.string('video_id', 20).notNullable()
      table.string('title', 500).notNullable()
      table.text('thumbnail').nullable()
      table.string('channel_name', 255).nullable()
      table.text('video_url').notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.unique(['user_id', 'video_id'])
      table.index(['user_id', 'created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
