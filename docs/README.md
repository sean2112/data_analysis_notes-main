# data_analysis_notes说明文档

本知识库旨在系统整理个人在数据分析领域的核心知识与实践经验，涵盖 SQL、Pandas、Excel、统计学及电商数据分析指标。文档结构清晰，便于系统学习、复盘和查阅。

---

## 🌐 在线访问

点击下方按钮直接访问我的数据分析笔记网站：

<p align="center">
  <a href="https://sean2112.github.io/data_analysis_notes/" target="_blank">
    <img src="https://img.shields.io/badge/在线访问-数据分析笔记-blue?style=for-the-badge&logo=github" />
  </a>
</p>

📎 网站地址：  
https://sean2112.github.io/data_analysis_notes/

---

## 目录

1. [Excel 数据清洗与分析](./Excel.md)  
2. [MySQL 查询易错点](./MySQL查询易错点.md)  
3. [MySQL 窗口函数](./MySQL窗口函数.md)  
4. [Pandas 数据分析](./Pandas.md)  
5. [电商核心指标](./电商数分指标.md)  
6. [统计学基础与电商数据分析](./统计学.md)  

---

## 文档概述

### 1. [Excel 数据清洗与分析](./Excel.md)  

- 内容：数据清洗方法、函数应用、文本与日期处理、条件统计、数据透视与可视化技巧
- 核心点：
  - 文本函数（TRIM、LEFT、MID、SUBSTITUTE 等）
  - 日期与时间函数（TODAY、NOW、DATEDIF 等）
  - 查找与引用（VLOOKUP、INDEX+MATCH、XLOOKUP、FILTER）
  - 逻辑与条件（IF、AND、OR、IFERROR）
  - 数据透视表及图表分析
  - 动态数组函数及公式调试

### 2. [MySQL 查询易错点](./MySQL查询易错点.md)

- 内容：SQL 查询中最常见的错误及优化方法
- 核心点：
  - CROSS JOIN 导致的数据膨胀
  - 聚合后维度丢失
  - LEFT JOIN 条件使用错误
  - WHERE 与 HAVING 使用不当
  - 子查询与 JOIN 的合理使用

### 3. [MySQL 窗口函数](./MySQL窗口函数.md) 

- 内容：窗口函数定义、语法、函数类型、Frame 范围及高级应用
- 核心点：
  - 聚合函数、排名函数、分析函数
  - Frame 窗口范围组合（累计、滑动、对称、全窗口）
  - ROWS 与 RANGE 区别
  - 执行顺序与高级分析

### 4. [Pandas 数据分析](./Pandas.md)  

- 内容：Python Pandas 库在数据分析中的核心操作与方法
- 核心点：
  - 数据读取与类型转换
  - 数据清洗（缺失值、重复值、异常值处理）
  - 分组聚合、透视表、多表合并
  - 函数映射、时间序列处理
  - 数据可视化及探索性数据分析（EDA）

### 5. [电商核心指标](./电商数分指标.md) 

- 内容：电商数据分析常用指标及计算方法
- 核心点：
  - 交易类：GMV、订单数、客单价
  - 用户价值类：LTV、ARPU、复购率、留存率
  - 用户规模类：活跃用户数、用户增长率
  - 质量与成本类：退货率、营销费用占比
  - 流量分析与模型应用：AARRR、RFM、漏斗分析、同期群分析

### 6. [统计学基础与电商数据分析](./统计学.md)  

- 内容：统计学原理及在电商数据分析中的应用
- 核心点：
  - 描述性统计（均值、中位数、方差、分位数等）
  - 概率分布及中心极限定理
  - 假设检验及 A/B 测试设计
  - 相关性分析（Pearson、Spearman）
  - 电商实战应用案例（转化率下降、用户分层、活动效果、异常检测）

---

## 版本与更新

- 初版：整理个人知识体系  
- 后续更新：补充最新 SQL、Python与电商分析知识
