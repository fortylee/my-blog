// plugins.ts
import { searchPlugin } from '@vuepress/plugin-search'

export default [
    // 插件配置
    searchPlugin({
        locales: {
            '/': {
                placeholder: 'Search'
            }
        }
    })
]