// theme.ts
import { defaultTheme } from '@vuepress/theme-default'
import markdownVue from '../vue/index'

export default defaultTheme({
    // 顶部导航栏配置
    navbar: [
        {
            text: 'nodejs',
            children: markdownVue
        },
        {
            text: 'vue',
            children: markdownVue
        },
        {
            text: 'react',
            children: markdownVue
        },
        {
            text: 'typescript',
            children: markdownVue
        }
    ],
    // 侧边栏配置
    sidebar: markdownVue,
    // logo配置
    logo: 'favicon.ico',
})