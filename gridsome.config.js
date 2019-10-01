// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Eugene Grechko | Frontend Developer',
  siteDescription: 'My journey of learning frontend development. I talk about coding, trading, life and really anything that I\'m intrested in.',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/blog/**/*.md',
        typeName: 'BlogPost',
        route: '/blog/:slug'
      }
    }
  ],
  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  },
}
