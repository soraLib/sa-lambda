import { defineConfig } from 'vitepress'

const Guide = [
  {
    text: 'Getting Started',
    link: '/guide/',
  },
  {
    text: 'FAQ',
    link: '/guide/faq',
  },
]

const Modules = [
  {
    text: 'Either',
    link: '/modules/Either',
  },
  {
    text: 'Maybe',
    link: '/modules/Maybe',
  },
  {
    text: 'Iterator',
    link: '/modules/Iterator',
  },
  {
    text: 'Pipe',
    link: '/modules/Pipe',
  },

  // utils
  {
    text: 'Function',
    link: '/modules/Function',
  },
  {
    text: 'Async',
    link: '/modules/Async',
  },
  {
    text: 'Delay',
    link: '/modules/Delay',
  },
  {
    text: 'Equal',
    link: '/modules/Equal',
  },
  {
    text: 'Effect',
    link: '/modules/Effect',
  },
  {
    text: 'Math',
    link: '/modules/Math',
  },
]

export default defineConfig({
  title: 'Sa Lambda',
  description: 'Typescript library for Pipeal programming.',
  lang: 'en-US',
  base: '/sa-lambda/',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'author', content: 'Hfutsora' }],
    ['meta', { name: 'keywords', content: 'functional programming, typescript' }],
    ['meta', { property: 'og:title', content: 'Sa Lambda' }],
    ['meta', { property: 'og:description', content: 'Typescript library for functional programming.' }],
  ],
  themeConfig: {
    logo: '/favicon.svg',
    editLink: {
      text: 'Edit this page',
      pattern: 'https://github.com/sa-lambda/blob/main/docs/:path',
    },
    lastUpdated: {
      text: 'Last Updated',
    },
    // TODO:
    // algolia: {
    //   appId: '9RKCMNMXLH',
    //   apiKey: 'da3138d2d4cb4812af97404777039175',
    //   indexName: 'SaLambda',
    // },
    nav: [
      {
        text: 'Guide',
        items: Guide,
      },
      {
        text: 'Modules',
        items: Modules,
      },
    ],
    sidebar: [{
      text: 'Guide',
      items: Guide,
    }, {
      text: 'Modules',
      items: Modules,
    }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Hfutsora',
    },
  },
})
