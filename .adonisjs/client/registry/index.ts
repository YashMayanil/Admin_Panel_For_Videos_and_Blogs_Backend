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
  'saved_blogs.index': {
    methods: ["GET","HEAD"],
    pattern: '/saved/blogs',
    tokens: [[0,"saved"],[0,"blogs"]],
    types: placeholder as Registry['saved_blogs.index']['types'],
  },
  'saved_blogs.store': {
    methods: ["POST"],
    pattern: '/saved/blogs',
    tokens: [[0,"saved"],[0,"blogs"]],
    types: placeholder as Registry['saved_blogs.store']['types'],
  },
  'saved_blogs.destroy': {
    methods: ["DELETE"],
    pattern: '/saved/blogs/:blogId',
    tokens: [[0,"saved"],[0,"blogs"],[1,"blogId"]],
    types: placeholder as Registry['saved_blogs.destroy']['types'],
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
