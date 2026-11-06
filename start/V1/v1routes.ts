import router from '@adonisjs/core/services/router'

import authRoutes from './auth/authRoutes.js'
import accountRoutes from './account/accountRoutes.js'
import blogRoutes from './blogs/blogRoutes.js'
import videoRoutes from './videos/videoRoutes.js'
import savedVideoRoutes from './savedVideos/savedVideoRoutes.js'
import activityRoutes from './activity/activityRoutes.js'
import dashboardRoutes from './dashboard/dashboardRoutes.js'
import domainRoutes from './domains/domainRoutes.js'
import seriesRoutes from './series/seriesRoutes.js'
import collectionRoutes from './collections/collectionRoutes.js'
import progressRoutes from './progress/progressRoutes.js'

export default function v1Routes() {
  router.group(() => {
    authRoutes()
    accountRoutes()
    blogRoutes()
    videoRoutes()
    savedVideoRoutes()
    activityRoutes()
    dashboardRoutes()
    domainRoutes()
    seriesRoutes()
    collectionRoutes()
    progressRoutes()
  })
  .prefix('/api/v1')
}

