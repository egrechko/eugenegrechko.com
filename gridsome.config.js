// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_main.scss'),
      ],
    })
}

module.exports = {
  siteName: 'Eugene Grechko 👨‍💻',
  siteDescription: 'My journey of learning frontend development. I talk about coding, trading, life and really anything that I\'m intrested in.',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/blog/**/*.md',
        typeName: 'BlogPost',
      }
    }
  ],
  templates: {
    BlogPost: '/blog/:title',
  },
  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        '@gridsome/remark-prismjs',
        'remark-toc',
      ]
    }
  },
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
	}
}
