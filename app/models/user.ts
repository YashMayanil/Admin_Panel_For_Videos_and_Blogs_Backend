import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Collection from '#models/collection'
import Activity from '#models/activity'
import SeriesVideosProgress from '#models/series_videos_progress'
import UserChapterProgress from '#models/user_chapter_progress'
import UserAudioProgress from '#models/user_audio_progress'
import UserBlogProgress from '#models/user_blog_progress'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  @hasMany(() => Collection)
  declare collections: HasMany<typeof Collection>

  @hasMany(() => Activity)
  declare activities: HasMany<typeof Activity>

  @hasMany(() => SeriesVideosProgress)
  declare seriesProgress: HasMany<typeof SeriesVideosProgress>

  @hasMany(() => UserChapterProgress)
  declare chapterProgress: HasMany<typeof UserChapterProgress>

  @hasMany(() => UserAudioProgress)
  declare audioProgress: HasMany<typeof UserAudioProgress>

  @hasMany(() => UserBlogProgress)
  declare blogProgress: HasMany<typeof UserBlogProgress>

}
