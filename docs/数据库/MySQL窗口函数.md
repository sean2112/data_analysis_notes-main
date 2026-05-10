# MySQL 窗口函数笔记

---

# 一、窗口函数概述

## 1. 定义

窗口函数：在**不减少行数的情况下**，对“当前行相关的一组数据”进行计算，用于实现累积、排名或滑动计算。

## 2. 与 GROUP BY 的区别

| 特点 | GROUP BY | 窗口函数 |
|------|----------|----------|
| 行数 | 汇总后减少 | 保持原始行数 |
| 结果 | 每组生成一行 | 每行都有计算结果 |
| 使用场景 | 数据聚合 | 分析、排名、累积计算 |

## 3. 核心理解

- 每行都有一个“窗口（window）”，窗口定义了与当前行相关的数据范围。
- 窗口函数在该窗口内计算，但不会改变行数。

---

# 二、窗口函数核心语法

```sql
window_function(expression) OVER (
    [PARTITION BY ...]
    [ORDER BY ...]
    [frame_clause]
)
```
# MySQL 窗口函数（Window Functions）笔记

---

# 三、函数类型

## 1. 聚合函数

- SUM()
- AVG()
- COUNT()
- MAX()
- MIN()

## 2. 排名函数

- ROW_NUMBER()
- RANK()
- DENSE_RANK()

## 3. 分析函数

- LAG()
- LEAD()
- FIRST_VALUE()
- LAST_VALUE()

---

# 四、OVER 关键字

- 标志窗口函数操作

---

# 五、PARTITION BY

- 将数据划分为多个窗口（类似 GROUP BY）
- 特点：
  - 不减少行数
  - 每个分区独立计算
  - 分区内部计算结果独立

---

# 六、ORDER BY

- 定义窗口内数据顺序
- 影响：
  - 排名函数必须依赖
  - 累计计算依赖
  - LAG/LEAD依赖

---

# 七、Frame 窗口范围

- 决定当前行“能访问哪些行”
- 基本语法：

```sql
ROWS BETWEEN 起点 AND 终点
RANGE BETWEEN 起点 AND 终点
```
# 七、Frame 起点/终点类型

- UNBOUNDED PRECEDING：从分区第一行开始
- UNBOUNDED FOLLOWING：到分区最后一行
- CURRENT ROW：当前行
- n PRECEDING：当前行往前 n 行
- n FOLLOWING：当前行往后 n 行

---

# 八、Frame 常见组合

## 1. 累计窗口（默认）

UNBOUNDED PRECEDING → CURRENT ROW

- 含义：从第一行累计到当前行
- 用途：累计求和、累计平均

## 2. 向前滑动窗口

n PRECEDING → CURRENT ROW

- 含义：当前行及前 n 行
- 用途：移动平均、短期趋势分析

## 3. 对称滑动窗口

n PRECEDING → n FOLLOWING

- 含义：当前行前后各 n 行
- 用途：平滑数据

## 4. 向后窗口

CURRENT ROW → n FOLLOWING

- 含义：当前行及后 n 行

## 5. 全窗口

UNBOUNDED PRECEDING → UNBOUNDED FOLLOWING

- 含义：分区内所有行
- 用途：全局统计

---

# 九、ROWS vs RANGE

| 类型 | 控制方式 | 特点 |
|------|----------|------|
| ROWS  | 行数 | 精确控制，按行计算 |
| RANGE | 数值范围 | 窗口内包含相同值，按逻辑数值范围计算 |

---

# 十、默认行为

1. 没有 PARTITION BY：整表作为一个窗口
2. 有 ORDER BY 但未指定 frame：默认 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
3. 没有 ORDER BY：无顺序概念，窗口内所有行参与计算

---

# 十一、执行顺序

FROM → WHERE → GROUP BY → HAVING → 窗口函数 → ORDER BY

---

# 十二、窗口函数分类

## 聚合函数

- 保持原行数，每行返回聚合结果

## 排名函数

| 函数 | 特点 |
|------|------|
| ROW_NUMBER() | 唯一编号 |
| RANK()       | 会跳号 |
| DENSE_RANK() | 不跳号 |

## 分析函数

- LAG(): 获取前一行数据
- LEAD(): 获取后一行数据
- FIRST_VALUE(): 窗口第一行
- LAST_VALUE(): 窗口最后一行（受 frame 影响）

---

# 十三、移动计算

- 移动平均：滑动窗口平均
- 累计计算：从起点累加到当前行

---

# 十四、排名与分布

- PERCENT_RANK(): 排名占比
- CUME_DIST(): 累计分布

---

# 十五、同比 / 环比 / CAGR

- 环比（MoM/QoQ）：(本期 - 上期) / 上期
- 同比（YoY）：(本期 - 去年同期) / 去年同期
- 复合年增长率（CAGR）：CAGR = (第N期数据 / 第1期基准数据)^(1/(N-1)) - 1

---

# 十六、WINDOW 子句（进阶）

WINDOW w AS (
    PARTITION BY category
    ORDER BY date
)

示例：

SELECT
    category,
    SUM(sales) OVER w AS total_sales,
    AVG(sales) OVER w AS avg_sales
FROM orders
WINDOW w AS (
    PARTITION BY category
    ORDER BY date
)

---

# 十七、关键总结

## 核心结构

函数 + OVER(PARTITION + ORDER BY + FRAME)

## 三大控制

1. PARTITION BY → 分区
2. ORDER BY → 排序
3. FRAME → 窗口范围

## Frame 记忆要点

- UNBOUNDED PRECEDING（开头）
- UNBOUNDED FOLLOWING（结尾）
- CURRENT ROW（当前行）
- n PRECEDING（向前 n 行）
- n FOLLOWING（向后 n 行）

## 本质理解

窗口函数 = 在“指定范围的数据窗口中”对每一行进行计算

---

# 总结

窗口函数核心：

控制每一行可访问的数据范围，然后在该范围内进行计算，实现累积、排名或滑动分析。
