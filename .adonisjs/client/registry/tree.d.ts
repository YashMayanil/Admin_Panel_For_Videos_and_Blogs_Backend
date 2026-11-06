/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    store: typeof routes['new_account.store']
  }
  accessTokens: {
    store: typeof routes['access_tokens.store']
    destroy: typeof routes['access_tokens.destroy']
  }
  auth: {
    sync: typeof routes['auth.sync']
    me: typeof routes['auth.me']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  blogs: {
    index: typeof routes['blogs.index']
    show: typeof routes['blogs.show']
    store: typeof routes['blogs.store']
    update: typeof routes['blogs.update']
    destroy: typeof routes['blogs.destroy']
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
  domain: {
    index: typeof routes['domain.index']
    show: typeof routes['domain.show']
    store: typeof routes['domain.store']
    update: typeof routes['domain.update']
    destroy: typeof routes['domain.destroy']
  }
  series: {
    index: typeof routes['series.index']
    store: typeof routes['series.store']
    show: typeof routes['series.show']
    update: typeof routes['series.update']
    destroy: typeof routes['series.destroy']
  }
  collections: {
    index: typeof routes['collections.index']
    show: typeof routes['collections.show']
    store: typeof routes['collections.store']
    update: typeof routes['collections.update']
    destroy: typeof routes['collections.destroy']
    addItem: typeof routes['collections.add_item']
    removeItem: typeof routes['collections.remove_item']
  }
  progress: {
    getVideoProgress: typeof routes['progress.get_video_progress']
    updateVideoProgress: typeof routes['progress.update_video_progress']
    getBlogProgress: typeof routes['progress.get_blog_progress']
    updateBlogProgress: typeof routes['progress.update_blog_progress']
  }
}
