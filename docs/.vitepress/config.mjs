import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getSidebar(dirPath, basePath) {
  const fullPath = path.resolve(__dirname, '..', dirPath)
  const files = fs.readdirSync(fullPath)

  return files
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      const name = file.replace('.md', '')
      return {
        text: name,
        link: `${basePath}/${name}`
      }
    })
}

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/data_analysis_notes/'
    : '/',

  ignoreDeadLinks: true,

  title: '数据分析笔记',
  description: '个人知识库',

  markdown: {
    math: 'mathjax'
  },

  themeConfig: {
    outline: {
      level: [2, 3],
      label: '目录'
    },

    nav: [
      { text: '首页', link: '/' }
    ],

    sidebar: [
      {
        text: '数据分析',
        collapsed: false,
        items: getSidebar('数据分析', '/数据分析')
      },
      {
        text: '数据库',
        collapsed: false,
        items: getSidebar('数据库', '/数据库')
      }
    ]
  }
})
