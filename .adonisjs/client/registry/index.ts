/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"signup"]],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"login"]],
    types: placeholder as Registry['access_tokens.store']['types'],
  },
  'auth.sync': {
    methods: ["POST"],
    pattern: '/api/v1/auth/sync',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"sync"]],
    types: placeholder as Registry['auth.sync']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/me',
    tokens: [[0,"api"],[0,"v1"],[0,"auth"],[0,"me"]],
    types: placeholder as Registry['auth.me']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [[0,"api"],[0,"v1"],[0,"account"],[0,"profile"]],
    types: placeholder as Registry['profile.show']['types'],
  },
  'access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [[0,"api"],[0,"v1"],[0,"account"],[0,"logout"]],
    types: placeholder as Registry['access_tokens.destroy']['types'],
  },
  'blogs.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/blogs',
    tokens: [[0,"api"],[0,"v1"],[0,"blogs"]],
    types: placeholder as Registry['blogs.index']['types'],
  },
  'blogs.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/blogs/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"blogs"],[1,"id"]],
    types: placeholder as Registry['blogs.show']['types'],
  },
  'blogs.store': {
    methods: ["POST"],
    pattern: '/api/v1/blogs',
    tokens: [[0,"api"],[0,"v1"],[0,"blogs"]],
    types: placeholder as Registry['blogs.store']['types'],
  },
  'blogs.update': {
    methods: ["PUT"],
    pattern: '/api/v1/blogs/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"blogs"],[1,"id"]],
    types: placeholder as Registry['blogs.update']['types'],
  },
  'blogs.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/blogs/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"blogs"],[1,"id"]],
    types: placeholder as Registry['blogs.destroy']['types'],
  },
  'videos.search': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/videos/search',
    tokens: [[0,"api"],[0,"v1"],[0,"videos"],[0,"search"]],
    types: placeholder as Registry['videos.search']['types'],
  },
  'videos.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/videos/:videoId',
    tokens: [[0,"api"],[0,"v1"],[0,"videos"],[1,"videoId"]],
    types: placeholder as Registry['videos.show']['types'],
  },
  'saved_videos.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/saved/videos',
    tokens: [[0,"api"],[0,"v1"],[0,"saved"],[0,"videos"]],
    types: placeholder as Registry['saved_videos.index']['types'],
  },
  'saved_videos.store': {
    methods: ["POST"],
    pattern: '/api/v1/saved/videos',
    tokens: [[0,"api"],[0,"v1"],[0,"saved"],[0,"videos"]],
    types: placeholder as Registry['saved_videos.store']['types'],
  },
  'saved_videos.unsave': {
    methods: ["DELETE"],
    pattern: '/api/v1/saved/videos/:videoId',
    tokens: [[0,"api"],[0,"v1"],[0,"saved"],[0,"videos"],[1,"videoId"]],
    types: placeholder as Registry['saved_videos.unsave']['types'],
  },
  'activities.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/activity',
    tokens: [[0,"api"],[0,"v1"],[0,"activity"]],
    types: placeholder as Registry['activities.index']['types'],
  },
  'activities.store': {
    methods: ["POST"],
    pattern: '/api/v1/activity',
    tokens: [[0,"api"],[0,"v1"],[0,"activity"]],
    types: placeholder as Registry['activities.store']['types'],
  },
  'dashboard.stats': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/stats',
    tokens: [[0,"api"],[0,"v1"],[0,"dashboard"],[0,"stats"]],
    types: placeholder as Registry['dashboard.stats']['types'],
  },
  'domain.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/domains',
    tokens: [[0,"api"],[0,"v1"],[0,"domains"]],
    types: placeholder as Registry['domain.index']['types'],
  },
  'domain.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/domains/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"domains"],[1,"id"]],
    types: placeholder as Registry['domain.show']['types'],
  },
  'domain.store': {
    methods: ["POST"],
    pattern: '/api/v1/domains',
    tokens: [[0,"api"],[0,"v1"],[0,"domains"]],
    types: placeholder as Registry['domain.store']['types'],
  },
  'domain.update': {
    methods: ["PUT"],
    pattern: '/api/v1/domains/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"domains"],[1,"id"]],
    types: placeholder as Registry['domain.update']['types'],
  },
  'domain.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/domains/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"domains"],[1,"id"]],
    types: placeholder as Registry['domain.destroy']['types'],
  },
  'series.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/series',
    tokens: [[0,"api"],[0,"v1"],[0,"series"]],
    types: placeholder as Registry['series.index']['types'],
  },
  'series.store': {
    methods: ["POST"],
    pattern: '/api/v1/series',
    tokens: [[0,"api"],[0,"v1"],[0,"series"]],
    types: placeholder as Registry['series.store']['types'],
  },
  'series.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/series/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"series"],[1,"id"]],
    types: placeholder as Registry['series.show']['types'],
  },
  'series.update': {
    methods: ["PUT"],
    pattern: '/api/v1/series/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"series"],[1,"id"]],
    types: placeholder as Registry['series.update']['types'],
  },
  'series.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/series/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"series"],[1,"id"]],
    types: placeholder as Registry['series.destroy']['types'],
  },
  'collections.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/collections',
    tokens: [[0,"api"],[0,"v1"],[0,"collections"]],
    types: placeholder as Registry['collections.index']['types'],
  },
  'collections.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/collections/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"collections"],[1,"id"]],
    types: placeholder as Registry['collections.show']['types'],
  },
  'collections.store': {
    methods: ["POST"],
    pattern: '/api/v1/collections',
    tokens: [[0,"api"],[0,"v1"],[0,"collections"]],
    types: placeholder as Registry['collections.store']['types'],
  },
  'collections.update': {
    methods: ["PUT"],
    pattern: '/api/v1/collections/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"collections"],[1,"id"]],
    types: placeholder as Registry['collections.update']['types'],
  },
  'collections.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/collections/:id',
    tokens: [[0,"api"],[0,"v1"],[0,"collections"],[1,"id"]],
    types: placeholder as Registry['collections.destroy']['types'],
  },
  'collections.add_item': {
    methods: ["POST"],
    pattern: '/api/v1/collections/:id/items',
    tokens: [[0,"api"],[0,"v1"],[0,"collections"],[1,"id"],[0,"items"]],
    types: placeholder as Registry['collections.add_item']['types'],
  },
  'collections.remove_item': {
    methods: ["DELETE"],
    pattern: '/api/v1/collections/:id/items/:itemId',
    tokens: [[0,"api"],[0,"v1"],[0,"collections"],[1,"id"],[0,"items"],[1,"itemId"]],
    types: placeholder as Registry['collections.remove_item']['types'],
  },
  'progress.get_video_progress': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/progress/videos/:seriesId',
    tokens: [[0,"api"],[0,"v1"],[0,"progress"],[0,"videos"],[1,"seriesId"]],
    types: placeholder as Registry['progress.get_video_progress']['types'],
  },
  'progress.update_video_progress': {
    methods: ["PUT"],
    pattern: '/api/v1/progress/videos/:seriesId',
    tokens: [[0,"api"],[0,"v1"],[0,"progress"],[0,"videos"],[1,"seriesId"]],
    types: placeholder as Registry['progress.update_video_progress']['types'],
  },
  'progress.get_blog_progress': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/progress/blogs/:blogId',
    tokens: [[0,"api"],[0,"v1"],[0,"progress"],[0,"blogs"],[1,"blogId"]],
    types: placeholder as Registry['progress.get_blog_progress']['types'],
  },
  'progress.update_blog_progress': {
    methods: ["PUT"],
    pattern: '/api/v1/progress/blogs/:blogId',
    tokens: [[0,"api"],[0,"v1"],[0,"progress"],[0,"blogs"],[1,"blogId"]],
    types: placeholder as Registry['progress.update_blog_progress']['types'],
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
