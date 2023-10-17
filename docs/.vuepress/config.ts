import { defineUserConfig } from 'vuepress'
import plugins from './plugins'
import theme from './theme'

export default defineUserConfig({
    base: '/docs/',
    title: 'vuepress',
    port: 8088,
    // 主题配置
    theme,
    // 插件配置
    plugins,
    // logo配置
    head: [
        ['link', { rel: 'ico', href: '/favicon.ico'}]
    ]
})