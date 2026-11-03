/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
    sync: typeof routes['auth.sync']
    me: typeof routes['auth.me']
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  blogs: {
    index: typeof routes['blogs.index']
    show: typeof routes['blogs.show']
  }
  savedBlogs: {
    index: typeof routes['saved_blogs.index']
    store: typeof routes['saved_blogs.store']
    destroy: typeof routes['saved_blogs.destroy']
  }
  videos: {
    search: typeof routes['videos.search']
    show: typeof routes['videos.show']
  }
  savedVideos: {
    index: typeof routes['saved_videos.index']
    store: typeof routes['saved_videos.store']
    unsave: typeof routes['saved_videos.unsave']
  }
  activities: {
    index: typeof routes['activities.index']
    store: typeof routes['activities.store']
  }
  dashboard: {
    stats: typeof routes['dashboard.stats']
  }
}
