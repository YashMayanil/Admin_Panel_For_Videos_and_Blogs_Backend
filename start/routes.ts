/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import AuthController from '#controllers/auth_controller'
import BlogsController from '#controllers/blog_controller'
import VideosController from '#controllers/videos_controller'
import SavedVideosController from '#controllers/save_video_controller'
import SavedBlogsController from '#controllers/save_blog_controller'
import ActivitiesController from '#controllers/activity_controller'
import DashboardController from '#controllers/dashboard_controller'
import throttle from '#start/limiter'
import DomainController from '#controllers/domains_controller'
import SeriesController from '#controllers/series_controller'



router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')

router
  .get('/protected-test', async ({ authenticatedUser }) => {
    return {
      message: 'Authenticated successfully!',
      uid: authenticatedUser.uid,
    }
  })
  .use(middleware.firebaseAuth())

//authentication routes group for better appraoch...
router.post('/auth/sync', [AuthController, 'sync']).use(middleware.firebaseAuth())
router.get('/auth/me', [AuthController, 'me']).use(middleware.firebaseAuth())

//blog routes
router.get('/blogs', [BlogsController, 'index'])
router.get("/blogs/:id",[BlogsController,'show'])
router.post('/blogs', [BlogsController, 'store'])
router.put("/blogs/:id",[BlogsController,'update'])
router.delete("/blogs/:id",[BlogsController,'destroy'])

//video routes
router.get('/videos/search', [VideosController, 'search'])
router.get('/videos/:videoId', [VideosController, 'show'])

// video routes for count save and unsave
router
  .group(() => {
    router.get('/videos', [SavedVideosController, 'index'])
    router.post('/videos', [SavedVideosController, 'store'])
    router.delete('/videos/:videoId', [SavedVideosController, 'unsave'])
  })
  .prefix('/saved')
  .use(middleware.firebaseAuth())
  .use(throttle)

//activity routes
router
  .group(() => {
    router.get('/', [ActivitiesController, 'index'])
    router.post('/', [ActivitiesController, 'store'])
  })
  .prefix('/activity')
  .use(middleware.firebaseAuth())
  .use(throttle)

//dasboard routes
router
  .get('/dashboard/stats', [DashboardController, 'stats'])
  .use(middleware.firebaseAuth())
  .use(throttle)


//domain related routes
router
    .group(()=>{
      router.get('/', [DomainController, 'index'])
      router.get('/:id', [DomainController, 'show'])
      router.post('/', [DomainController, 'store'])
      router.put('/:id', [DomainController, 'update'])
      router.delete('/:id', [DomainController, 'destroy'])
    })
    .prefix("/domains")


//series realted routes
router.get('/series', [SeriesController, 'index'])
router.post('/series', [SeriesController, 'store'])
router.get('/series/:id', [SeriesController, 'show'])
router.put('/series/:id', [SeriesController, 'update'])
router.delete('/series/:id', [SeriesController, 'destroy'])


//collection related routes

const CollectionsController = () => import('#controllers/collections_controller')

router
  .group(() => {
    router.get('/collections', [CollectionsController, 'index'])
    router.get('/collections/:id', [CollectionsController, 'show'])
    router.post('/collections', [CollectionsController, 'store'])
    router.put('/collections/:id', [CollectionsController, 'update'])
    router.delete('/collections/:id', [CollectionsController, 'destroy'])

    router.post('/collections/:id/items', [CollectionsController, 'addItem'])
    router.delete(
      '/collections/:id/items/:itemId',
      [CollectionsController, 'removeItem']
    )
  })

      
