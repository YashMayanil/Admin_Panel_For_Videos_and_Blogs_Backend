
import Domain from '#models/domain'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class DomainSeeder extends BaseSeeder {
  async run() {
    const domains = [
      {
        name: 'Technology',
        slug: 'technology',
        description: 'Explore technology, programming, software development and AI.',
      },
      {
        name: 'Entertainment',
        slug: 'entertainment',
        description: 'Discover movies, music, celebrities and entertainment.',
      },
      {
        name: 'Education',
        slug: 'education',
        description: 'Learn new skills through educational videos and articles.',
      },
      {
        name: 'Sports',
        slug: 'sports',
        description: 'Explore sports news, highlights and sports-related content.',
      },
      {
        name: 'Science',
        slug: 'science',
        description: 'Discover scientific knowledge, research and innovations.',
      },
      {
        name: 'Business',
        slug: 'business',
        description: 'Explore business, startups, finance and entrepreneurship.',
      },
    ]

    for (const domain of domains) {
      await Domain.updateOrCreate(
        { slug: domain.slug },
        domain
      )
    }

    console.log('Domains seeded successfully!')
  }
}
