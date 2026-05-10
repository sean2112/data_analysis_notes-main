# SQL 五大常见问题


---

## 1：CROSS JOIN 导致数据膨胀

### 问题示例

FROM A
CROSS JOIN B

- CROSS JOIN 会生成笛卡尔积
- 结果行数 = 行数(A) × 行数(B)

#### 潜在风险

- 数据被重复复制
- 聚合结果被放大或稀释
- 比例计算或百分比分析可能出现误差

#### 常见错误示例

SELECT *
FROM Queries q
CROSS JOIN (
    SELECT COUNT(*) AS c FROM Queries
) t

- 每一行都与所有计数值配对 → 错误结果

#### 正确做法

- 必须明确关联条件：

JOIN ... ON A.column = B.column

---

## 2：聚合后丢失维度

### 问题示例

SELECT COUNT(*) 
FROM Queries 
GROUP BY query_name

- 返回结果仅包含聚合值
- 丢失 query_name 等分组字段

#### 潜在风险

- 无法将聚合结果关联回原始表
- 数据错位，分析结果错误

#### 错误示例

SELECT COUNT(*) AS c
FROM Queries
GROUP BY query_name

- query_name 未包含在 SELECT 中 → 数据分析错误

#### 正确做法

SELECT query_name, COUNT(*) AS c
FROM Queries
GROUP BY query_name

- 口诀：分组字段必须出现在 SELECT 中

---

## 3：LEFT JOIN 被 WHERE 条件“破坏”

### 问题示例

SELECT *
FROM A
LEFT JOIN B ON A.id = B.id
WHERE B.id IS NOT NULL

- 实际等价于 INNER JOIN
- LEFT JOIN 的意义丧失

#### 正确做法

- 将过滤条件放在 ON 子句中：

LEFT JOIN B
ON A.id = B.id
AND B.column = ...

- 口诀：LEFT JOIN 的条件应写在 ON 子句中

---

## 4：WHERE 与 HAVING 使用不当

### 区别

|          | WHERE        | HAVING       |
|----------|-------------|-------------|
| 执行时机 | 分组前       | 分组后       |
| 是否可用聚合函数 | ❌          | ✅          |

#### 错误示例

SELECT query_name
FROM Queries
WHERE COUNT(*) > 1

- 报错：WHERE 不支持聚合函数

### 正确写法

SELECT query_name
FROM Queries
GROUP BY query_name
HAVING COUNT(*) > 1

- 口诀：涉及 COUNT / SUM 等聚合函数 → 使用 HAVING

---

## 5：不必要的子查询 + JOIN

### 问题

- 明明可以直接 GROUP BY，却使用子查询再 JOIN

#### 错误示例

SELECT q.query_name, ff.c
FROM Queries q
JOIN (
    SELECT query_name, COUNT(*) AS c
    FROM Queries
    GROUP BY query_name
) ff
ON q.query_name = ff.query_name

#### 风险

- SQL 结构复杂
- 容易重复计算
- 易引入错误

### 正确做法

SELECT 
    query_name,
    COUNT(*) AS c
FROM Queries
GROUP BY query_name

- 高级写法示例：

SUM(condition)

例如：

SUM(rating < 3)

- 等价于统计差评数量

- 口诀：
  - 能用 GROUP BY 就不要 JOIN
  - 能用 SUM(condition) 就不要写子查询

---

## 核心认知总结

SQL 的本质是三个步骤：

1. 过滤数据 → WHERE  
2. 聚合分组 → GROUP BY  
3. 生成结果 → HAVING / SELECT

---

## 使用建议

- JOIN 用于“对齐数据”
- GROUP BY 用于“统计分析”
- 子查询仅在必要时使用

---
