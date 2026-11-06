
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'domains'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.text('description').nullable()

      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(this.now())

      table
        .timestamp('updated_at', { useTz: true })
        .notNullable()
        .defaultTo(this.now())

      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
