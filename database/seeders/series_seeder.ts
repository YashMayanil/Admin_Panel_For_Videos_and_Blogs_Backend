
// import Domain from '#models/domain'
// import Series from '#models/series'
// import { BaseSeeder } from '@adonisjs/lucid/seeders'

// export default class SeriesSeeder extends BaseSeeder {
//   async run() {
//     const technology = await Domain.findByOrFail('slug', 'technology')
//     const entertainment = await Domain.findByOrFail('slug', 'entertainment')

//     const videos = [
//       {
//         domainId: technology.id,
//         title: 'JavaScript Full Course',
//         description: 'Learn JavaScript fundamentals and core concepts.',
//         videoDuration: 3600,
//         videoSrc: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
//         tags: JSON.stringify(['JavaScript', 'Programming', 'Web Development']),
//       },
//       {
//         domainId: technology.id,
//         title: 'React JS Full Course',
//         description: 'Learn React and build modern user interfaces.',
//         videoDuration: 3600,
//         videoSrc: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
//         tags: JSON.stringify(['React', 'JavaScript', 'Frontend']),
//       },
//       {
//         domainId: entertainment.id,
//         title: 'Movie Making Behind the Scenes',
//         description: 'Explore the filmmaking process.',
//         videoDuration: 1200,
//         videoSrc: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
//         tags: JSON.stringify(['Movies', 'Entertainment']),
//       },
//     ]

//     for (const video of videos) {
//       await Series.updateOrCreate(
//         {
//           domainId: video.domainId,
//           title: video.title,
//         },
//         video 
//       )
//     }

//     console.log('Videos seeded successfully!')
//   }
// }
