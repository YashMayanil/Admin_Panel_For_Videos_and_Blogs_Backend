import router from '@adonisjs/core/services/router'
import DomainController from '#controllers/domains_controller'

export default function domainRoutes() {
  router
    .group(() => {
      router.get('/', [DomainController, 'index'])
      router.get('/:id', [DomainController, 'show'])
      router.post('/', [DomainController, 'store'])
      router.put('/:id', [DomainController, 'update'])
      router.delete('/:id', [DomainController, 'destroy'])
    })
    .prefix('/domains')
}

