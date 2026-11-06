import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'access_tokens.store': { paramsTuple?: []; params?: {} }
    'auth.sync': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.store': { paramsTuple?: []; params?: {} }
    'blogs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'videos.search': { paramsTuple?: []; params?: {} }
    'videos.show': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'saved_videos.index': { paramsTuple?: []; params?: {} }
    'saved_videos.store': { paramsTuple?: []; params?: {} }
    'saved_videos.unsave': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'activities.index': { paramsTuple?: []; params?: {} }
    'activities.store': { paramsTuple?: []; params?: {} }
    'dashboard.stats': { paramsTuple?: []; params?: {} }
    'domain.index': { paramsTuple?: []; params?: {} }
    'domain.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'domain.store': { paramsTuple?: []; params?: {} }
    'domain.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'domain.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'series.index': { paramsTuple?: []; params?: {} }
    'series.store': { paramsTuple?: []; params?: {} }
    'series.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'series.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'series.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.index': { paramsTuple?: []; params?: {} }
    'collections.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.store': { paramsTuple?: []; params?: {} }
    'collections.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.add_item': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.remove_item': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'itemId': ParamValue} }
    'progress.get_video_progress': { paramsTuple: [ParamValue]; params: {'seriesId': ParamValue} }
    'progress.update_video_progress': { paramsTuple: [ParamValue]; params: {'seriesId': ParamValue} }
    'progress.get_blog_progress': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'progress.update_blog_progress': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'access_tokens.store': { paramsTuple?: []; params?: {} }
    'auth.sync': { paramsTuple?: []; params?: {} }
    'access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'blogs.store': { paramsTuple?: []; params?: {} }
    'saved_videos.store': { paramsTuple?: []; params?: {} }
    'activities.store': { paramsTuple?: []; params?: {} }
    'domain.store': { paramsTuple?: []; params?: {} }
    'series.store': { paramsTuple?: []; params?: {} }
    'collections.store': { paramsTuple?: []; params?: {} }
    'collections.add_item': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'videos.search': { paramsTuple?: []; params?: {} }
    'videos.show': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'saved_videos.index': { paramsTuple?: []; params?: {} }
    'activities.index': { paramsTuple?: []; params?: {} }
    'dashboard.stats': { paramsTuple?: []; params?: {} }
    'domain.index': { paramsTuple?: []; params?: {} }
    'domain.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'series.index': { paramsTuple?: []; params?: {} }
    'series.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.index': { paramsTuple?: []; params?: {} }
    'collections.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'progress.get_video_progress': { paramsTuple: [ParamValue]; params: {'seriesId': ParamValue} }
    'progress.get_blog_progress': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
  }
  HEAD: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'videos.search': { paramsTuple?: []; params?: {} }
    'videos.show': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'saved_videos.index': { paramsTuple?: []; params?: {} }
    'activities.index': { paramsTuple?: []; params?: {} }
    'dashboard.stats': { paramsTuple?: []; params?: {} }
    'domain.index': { paramsTuple?: []; params?: {} }
    'domain.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'series.index': { paramsTuple?: []; params?: {} }
    'series.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.index': { paramsTuple?: []; params?: {} }
    'collections.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'progress.get_video_progress': { paramsTuple: [ParamValue]; params: {'seriesId': ParamValue} }
    'progress.get_blog_progress': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
  }
  PUT: {
    'blogs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'domain.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'series.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'progress.update_video_progress': { paramsTuple: [ParamValue]; params: {'seriesId': ParamValue} }
    'progress.update_blog_progress': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
  }
  DELETE: {
    'blogs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'saved_videos.unsave': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'domain.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'series.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.remove_item': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'itemId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}