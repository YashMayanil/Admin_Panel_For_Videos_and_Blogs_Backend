import router from '@adonisjs/core/services/router'
import BlogsController from '#controllers/blog_controller'

export default function blogRoutes() {
  router
    .group(() => {
      router.get('/', [BlogsController, 'index'])
      router.get('/:id', [BlogsController, 'show'])
      router.post('/', [BlogsController, 'store'])
      router.put('/:id', [BlogsController, 'update'])
      router.delete('/:id', [BlogsController, 'destroy'])
    })
    .prefix('/blogs')
}

