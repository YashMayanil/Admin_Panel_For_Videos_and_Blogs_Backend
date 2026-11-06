
import Domain from '#models/domain'
import Blog from '#models/blog'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class BlogSeeder extends BaseSeeder {
  async run() {
    const technology = await Domain.findByOrFail('slug', 'technology')
    const entertainment = await Domain.findByOrFail('slug', 'entertainment')

    const blogs = [
      {
        domainId: technology.id,
        title: 'Understanding JavaScript Closures',
        content: 'JavaScript closures allow a function to remember variables from its outer scope even after the outer function has finished executing.',
        readTime: 5,
        tags: ['JavaScript', 'Closures', 'Programming'],
      },
      {
        domainId: technology.id,
        title: 'Introduction to React Hooks',
        content: 'React Hooks allow functional components to use state and other React features. Popular hooks include useState, useEffect and useContext.',
        readTime: 6,
        tags: ['React', 'Hooks', 'Frontend'],
      },
      {
        domainId: entertainment.id,
        title: 'How Movies Are Made',
        content: 'Movie production involves several stages, including development, pre-production, filming and post-production.',
        readTime: 4,
        tags: ['Movies', 'Filmmaking'],
      },
    ]

    for (const blog of blogs) {
      const tags = JSON.stringify(blog.tags) as unknown as string[]

      await Blog.updateOrCreate(
        {
          domainId: blog.domainId,
          title: blog.title,
        },
        {
          ...blog,
          tags,
        }
      )
    }

    console.log('Blogs seeded successfully!')
  }
}
