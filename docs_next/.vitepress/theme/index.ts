import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import HomeHeroInfo from '../components/HomeHero.vue'

import './styles/vars.css'
import './styles/code.css'
import './styles/sidebar-links.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-info': () => h(HomeHeroInfo),
    })
  },
}
