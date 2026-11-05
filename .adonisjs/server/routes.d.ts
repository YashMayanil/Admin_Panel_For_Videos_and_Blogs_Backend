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
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'auth.sync': { paramsTuple?: []; params?: {} }
    'blogs.store': { paramsTuple?: []; params?: {} }
    'saved_videos.store': { paramsTuple?: []; params?: {} }
    'activities.store': { paramsTuple?: []; params?: {} }
    'domain.store': { paramsTuple?: []; params?: {} }
    'series.store': { paramsTuple?: []; params?: {} }
    'collections.store': { paramsTuple?: []; params?: {} }
    'collections.add_item': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
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
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
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
  }
  PUT: {
    'blogs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'domain.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'series.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'collections.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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