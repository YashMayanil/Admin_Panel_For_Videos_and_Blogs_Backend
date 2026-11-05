/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"signup"]],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"login"]],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [[0,"api"],[0,"v1"],[0,"account"],[0,"profile"]],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [[0,"api"],[0,"v1"],[0,"account"],[0,"logout"]],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'auth.sync': {
    methods: ["POST"],
    pattern: '/auth/sync',
    tokens: [[0,"auth"],[0,"sync"]],
    types: placeholder as Registry['auth.sync']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/auth/me',
    tokens: [[0,"auth"],[0,"me"]],
    types: placeholder as Registry['auth.me']['types'],
  },
  'blogs.index': {
    methods: ["GET","HEAD"],
    pattern: '/blogs',
    tokens: [[0,"blogs"]],
    types: placeholder as Registry['blogs.index']['types'],
  },
  'blogs.show': {
    methods: ["GET","HEAD"],
    pattern: '/blogs/:id',
    tokens: [[0,"blogs"],[1,"id"]],
    types: placeholder as Registry['blogs.show']['types'],
  },
  'blogs.store': {
    methods: ["POST"],
    pattern: '/blogs',
    tokens: [[0,"blogs"]],
    types: placeholder as Registry['blogs.store']['types'],
  },
  'blogs.update': {
    methods: ["PUT"],
    pattern: '/blogs/:id',
    tokens: [[0,"blogs"],[1,"id"]],
    types: placeholder as Registry['blogs.update']['types'],
  },
  'blogs.destroy': {
    methods: ["DELETE"],
    pattern: '/blogs/:id',
    tokens: [[0,"blogs"],[1,"id"]],
    types: placeholder as Registry['blogs.destroy']['types'],
  },
  'videos.search': {
    methods: ["GET","HEAD"],
    pattern: '/videos/search',
    tokens: [[0,"videos"],[0,"search"]],
    types: placeholder as Registry['videos.search']['types'],
  },
  'videos.show': {
    methods: ["GET","HEAD"],
    pattern: '/videos/:videoId',
    tokens: [[0,"videos"],[1,"videoId"]],
    types: placeholder as Registry['videos.show']['types'],
  },
  'saved_videos.index': {
    methods: ["GET","HEAD"],
    pattern: '/saved/videos',
    tokens: [[0,"saved"],[0,"videos"]],
    types: placeholder as Registry['saved_videos.index']['types'],
  },
  'saved_videos.store': {
    methods: ["POST"],
    pattern: '/saved/videos',
    tokens: [[0,"saved"],[0,"videos"]],
    types: placeholder as Registry['saved_videos.store']['types'],
  },
  'saved_videos.unsave': {
    methods: ["DELETE"],
    pattern: '/saved/videos/:videoId',
    tokens: [[0,"saved"],[0,"videos"],[1,"videoId"]],
    types: placeholder as Registry['saved_videos.unsave']['types'],
  },
  'activities.index': {
    methods: ["GET","HEAD"],
    pattern: '/activity',
    tokens: [[0,"activity"]],
    types: placeholder as Registry['activities.index']['types'],
  },
  'activities.store': {
    methods: ["POST"],
    pattern: '/activity',
    tokens: [[0,"activity"]],
    types: placeholder as Registry['activities.store']['types'],
  },
  'dashboard.stats': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/stats',
    tokens: [[0,"dashboard"],[0,"stats"]],
    types: placeholder as Registry['dashboard.stats']['types'],
  },
  'domain.index': {
    methods: ["GET","HEAD"],
    pattern: '/domains',
    tokens: [[0,"domains"]],
    types: placeholder as Registry['domain.index']['types'],
  },
  'domain.show': {
    methods: ["GET","HEAD"],
    pattern: '/domains/:id',
    tokens: [[0,"domains"],[1,"id"]],
    types: placeholder as Registry['domain.show']['types'],
  },
  'domain.store': {
    methods: ["POST"],
    pattern: '/domains',
    tokens: [[0,"domains"]],
    types: placeholder as Registry['domain.store']['types'],
  },
  'domain.update': {
    methods: ["PUT"],
    pattern: '/domains/:id',
    tokens: [[0,"domains"],[1,"id"]],
    types: placeholder as Registry['domain.update']['types'],
  },
  'domain.destroy': {
    methods: ["DELETE"],
    pattern: '/domains/:id',
    tokens: [[0,"domains"],[1,"id"]],
    types: placeholder as Registry['domain.destroy']['types'],
  },
  'series.index': {
    methods: ["GET","HEAD"],
    pattern: '/series',
    tokens: [[0,"series"]],
    types: placeholder as Registry['series.index']['types'],
  },
  'series.store': {
    methods: ["POST"],
    pattern: '/series',
    tokens: [[0,"series"]],
    types: placeholder as Registry['series.store']['types'],
  },
  'series.show': {
    methods: ["GET","HEAD"],
    pattern: '/series/:id',
    tokens: [[0,"series"],[1,"id"]],
    types: placeholder as Registry['series.show']['types'],
  },
  'series.update': {
    methods: ["PUT"],
    pattern: '/series/:id',
    tokens: [[0,"series"],[1,"id"]],
    types: placeholder as Registry['series.update']['types'],
  },
  'series.destroy': {
    methods: ["DELETE"],
    pattern: '/series/:id',
    tokens: [[0,"series"],[1,"id"]],
    types: placeholder as Registry['series.destroy']['types'],
  },
  'collections.index': {
    methods: ["GET","HEAD"],
    pattern: '/collections',
    tokens: [[0,"collections"]],
    types: placeholder as Registry['collections.index']['types'],
  },
  'collections.show': {
    methods: ["GET","HEAD"],
    pattern: '/collections/:id',
    tokens: [[0,"collections"],[1,"id"]],
    types: placeholder as Registry['collections.show']['types'],
  },
  'collections.store': {
    methods: ["POST"],
    pattern: '/collections',
    tokens: [[0,"collections"]],
    types: placeholder as Registry['collections.store']['types'],
  },
  'collections.update': {
    methods: ["PUT"],
    pattern: '/collections/:id',
    tokens: [[0,"collections"],[1,"id"]],
    types: placeholder as Registry['collections.update']['types'],
  },
  'collections.destroy': {
    methods: ["DELETE"],
    pattern: '/collections/:id',
    tokens: [[0,"collections"],[1,"id"]],
    types: placeholder as Registry['collections.destroy']['types'],
  },
  'collections.add_item': {
    methods: ["POST"],
    pattern: '/collections/:id/items',
    tokens: [[0,"collections"],[1,"id"],[0,"items"]],
    types: placeholder as Registry['collections.add_item']['types'],
  },
  'collections.remove_item': {
    methods: ["DELETE"],
    pattern: '/collections/:id/items/:itemId',
    tokens: [[0,"collections"],[1,"id"],[0,"items"],[1,"itemId"]],
    types: placeholder as Registry['collections.remove_item']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
