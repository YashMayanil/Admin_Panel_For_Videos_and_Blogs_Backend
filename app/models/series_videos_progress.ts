import { SeriesVideosProgressSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'

export default class SeriesVideosProgress extends SeriesVideosProgressSchema {
    
    static table = 'series_videos_progress'
    
    @column()
    declare lastPositionSeconds: number
  
}