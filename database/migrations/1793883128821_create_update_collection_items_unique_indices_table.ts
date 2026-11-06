
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    // Remove the old unique constraint
    await this.schema.raw(`
      ALTER TABLE collection_items
      DROP CONSTRAINT IF EXISTS
      collection_items_collection_id_content_type_content_id_unique
    `)

    // Allow only one active copy of an item per collection
    await this.schema.raw(`
      CREATE UNIQUE INDEX IF NOT EXISTS collection_items_active_unique
      ON collection_items (collection_id, content_type, content_id)
      WHERE deleted_at IS NULL
    `)
  }

  async down() {
    await this.schema.raw(`
      DROP INDEX IF EXISTS collection_items_active_unique
    `)

    await this.schema.raw(`
      ALTER TABLE collection_items
      ADD CONSTRAINT collection_items_collection_id_content_type_content_id_unique
      UNIQUE (collection_id, content_type, content_id)
    `)
  }
}
