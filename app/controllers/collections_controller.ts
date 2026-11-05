
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Collection from '#models/collection'
import CollectionItem from '#models/collection_item'
import User from '#models/user'
import Series from '#models/series'
import Blog from '#models/blog'
import {
  createCollectionValidator,
  updateCollectionValidator,
  addCollectionItemValidator,
} from '#validators/collection'

export default class CollectionsController {
  // Resolve the logged-in Firebase user to our database user
  private async getUser(ctx: HttpContext) {
    const uid = ctx.authenticatedUser?.uid

    if (!uid) return null

    return User.findBy('firebaseUid', uid)
  }

  // GET /collections
  async index(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({ message: 'User not found' })
    }

    const collections = await Collection.query()
      .where('user_id', user.id)
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc')

    return ctx.response.ok({
      success: true,
      data: collections,
    })
  }

  // GET /collections/:id
  async show(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({ message: 'User not found' })
    }

    const collection = await Collection.query()
      .where('id', ctx.params.id)
      .where('user_id', user.id)
      .whereNull('deleted_at')
      .first()

    if (!collection) {
      return ctx.response.notFound({ message: 'Collection not found' })
    }

    const items = await CollectionItem.query()
      .where('collection_id', collection.id)
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc')

    return ctx.response.ok({
      success: true,
      data: { collection, items },
    })
  }

  // POST /collections
  async store(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({ message: 'User not found' })
    }

    const payload = await ctx.request.validateUsing(createCollectionValidator)

    const collection = await Collection.create({
      ...payload,
      userId: user.id,
    })

    return ctx.response.created({
      success: true,
      message: 'Collection created successfully',
      data: collection,
    })
  }

  // PUT /collections/:id
  async update(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({ message: 'User not found' })
    }

    const payload = await ctx.request.validateUsing(updateCollectionValidator)

    if (Object.keys(payload).length === 0) {
      return ctx.response.badRequest({
        message: 'At least one field is required',
      })
    }

    const collection = await Collection.query()
      .where('id', ctx.params.id)
      .where('user_id', user.id)
      .whereNull('deleted_at')
      .first()

    if (!collection) {
      return ctx.response.notFound({ message: 'Collection not found' })
    }

    collection.merge(payload)
    await collection.save()

    return ctx.response.ok({
      success: true,
      message: 'Collection updated successfully',
      data: collection,
    })
  }

  // DELETE /collections/:id
  async destroy(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({ message: 'User not found' })
    }

    const collection = await Collection.query()
      .where('id', ctx.params.id)
      .where('user_id', user.id)
      .whereNull('deleted_at')
      .first()

    if (!collection) {
      return ctx.response.notFound({ message: 'Collection not found' })
    }

    collection.deletedAt = DateTime.now()
    await collection.save()

    return ctx.response.ok({
      success: true,
      message: 'Collection deleted successfully',
    })
  }

  // POST /collections/:id/items
  async addItem(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({ message: 'User not found' })
    }

    const payload = await ctx.request.validateUsing(addCollectionItemValidator)

    const collection = await Collection.query()
      .where('id', ctx.params.id)
      .where('user_id', user.id)
      .whereNull('deleted_at')
      .first()

    if (!collection) {
      return ctx.response.notFound({ message: 'Collection not found' })
    }

    // Verify that the referenced content exists
    if (payload.contentType === 'series') {
      const video = await Series.query()
        .where('id', payload.contentId)
        .whereNull('deleted_at')
        .first()

      if (!video) {
        return ctx.response.notFound({ message: 'Video not found' })
      }
    } else {
      const blog = await Blog.query()
        .where('id', payload.contentId)
        .whereNull('deleted_at')
        .first()

      if (!blog) {
        return ctx.response.notFound({ message: 'Blog not found' })
      }
    }

    try {
      const item = await CollectionItem.create({
        collectionId: collection.id,
        contentType: payload.contentType,
        contentId: payload.contentId,
        progress: 0,
      })

      return ctx.response.created({
        success: true,
        message: 'Item added to collection successfully',
        data: item,
      })
    } catch (error: any) {
      if (error.code === '23505') {
        return ctx.response.conflict({
          success: false,
          message: 'Item already exists in this collection',
        })
      }

      throw error
    }
  }

  // DELETE /collections/:id/items/:itemId
  async removeItem(ctx: HttpContext) {
    const user = await this.getUser(ctx)

    if (!user) {
      return ctx.response.unauthorized({ message: 'User not found' })
    }

    const collection = await Collection.query()
      .where('id', ctx.params.id)
      .where('user_id', user.id)
      .whereNull('deleted_at')
      .first()

    if (!collection) {
      return ctx.response.notFound({ message: 'Collection not found' })
    }

    const item = await CollectionItem.query()
      .where('id', ctx.params.itemId)
      .where('collection_id', collection.id)
      .whereNull('deleted_at')
      .first()

    if (!item) {
      return ctx.response.notFound({ message: 'Collection item not found' })
    }

    item.deletedAt = DateTime.now()
    await item.save()

    return ctx.response.ok({
      success: true,
      message: 'Item removed from collection successfully',
    })
  }
}
