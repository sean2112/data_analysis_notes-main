import { defineConfig } from 'vitepress'

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
    ]
  }
})
