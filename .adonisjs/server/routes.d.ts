import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'auth.sync': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'saved_blogs.index': { paramsTuple?: []; params?: {} }
    'saved_blogs.store': { paramsTuple?: []; params?: {} }
    'saved_blogs.destroy': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'videos.search': { paramsTuple?: []; params?: {} }
    'videos.show': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'saved_videos.index': { paramsTuple?: []; params?: {} }
    'saved_videos.store': { paramsTuple?: []; params?: {} }
    'saved_videos.unsave': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'activities.index': { paramsTuple?: []; params?: {} }
    'activities.store': { paramsTuple?: []; params?: {} }
    'dashboard.stats': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'auth.sync': { paramsTuple?: []; params?: {} }
    'saved_blogs.store': { paramsTuple?: []; params?: {} }
    'saved_videos.store': { paramsTuple?: []; params?: {} }
    'activities.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'saved_blogs.index': { paramsTuple?: []; params?: {} }
    'videos.search': { paramsTuple?: []; params?: {} }
    'videos.show': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'saved_videos.index': { paramsTuple?: []; params?: {} }
    'activities.index': { paramsTuple?: []; params?: {} }
    'dashboard.stats': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'saved_blogs.index': { paramsTuple?: []; params?: {} }
    'videos.search': { paramsTuple?: []; params?: {} }
    'videos.show': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
    'saved_videos.index': { paramsTuple?: []; params?: {} }
    'activities.index': { paramsTuple?: []; params?: {} }
    'dashboard.stats': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'saved_blogs.destroy': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'saved_videos.unsave': { paramsTuple: [ParamValue]; params: {'videoId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}