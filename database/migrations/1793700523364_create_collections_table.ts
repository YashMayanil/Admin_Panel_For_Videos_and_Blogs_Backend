
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

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

      table.string('name').notNullable()
      table.text('description').nullable()
      table.boolean('is_default').notNullable().defaultTo(false)

      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(this.now())

      table
        .timestamp('updated_at', { useTz: true })
        .notNullable()
        .defaultTo(this.now())

      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.index(['user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
