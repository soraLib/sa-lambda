import type { UserConfig } from 'vitepress'

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
    link: '/modules/either',
  },
  {
    text: 'Maybe',
    link: '/modules/maybe',
  },
  {
    text: 'Function',
    link: '/modules/function',
  },
]

const slidebars = [
  {
    text: 'Guide',
    children: Guide.map((e) => {
      (e as any).useLinkText = `${e.text} | Guide`
      return e
    }),
  },
  {
    text: 'Modules',
    children: Modules.map((e) => {
      (e as any).useLinkText = `${e.text} | Modules`
      return e
    }),
  },
]

const config: UserConfig = {
  title: 'Sa Lambda',
  description: 'Typescript library for functional programming.',
  lang: 'en-US',
  base: '/sa-lambda/',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    // ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    // ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16' }],
    // ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ffffff' }],
    // ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['meta', { name: 'author', content: 'Hfutsora' }],
    ['meta', { name: 'keywords', content: 'functional programming, typescript' }],
    ['meta', { property: 'og:title', content: 'Vite Plugin PWA' }],
    ['meta', { property: 'og:description', content: 'Typescript library for functional programming.' }],
  ],
  themeConfig: {
    logo: '/favicon.svg',
    repo: 'soraLib/sa-lambda',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page',
    lastUpdated: 'Last Updated',
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
    sidebar: {
      'guide/': slidebars,
      'modules/': slidebars,
      '/sa-lambda/': slidebars,
      '/': slidebars,
    },
  },
}

export default config
