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
    ],

    sidebar: [
      {
        text: '数据分析',
        collapsed: false,
        items: [
          { text: 'Excel', link: '/数据分析/Excel' },
          { text: 'Pandas基础', link: '/数据分析/Pandas基础' },
          { text: 'Pandas', link: '/数据分析/Pandas' },
          { text: '统计学', link: '/数据分析/统计学' },
          { text: '电商数据指标', link: '/数据分析/电商数据指标' },
          { text: '业务分析', link: '/数据分析/业务分析' }
        ]
      },
      {
        text: '数据库',
        collapsed: false,
        items: [
          { text: 'MySQL查询易错点', link: '/数据库/MySQL查询易错点' },
          { text: 'MySQL窗口函数', link: '/数据库/MySQL窗口函数' },
          { text: 'MySQL的case_when语句', link: '/数据库/MySQL的case_when语句' },
          { text: 'MySQLgroup_concat函数用法', link: '/数据库/MySQLgroup_concat函数用法' }
        ]
      }
    ]
  }
})
