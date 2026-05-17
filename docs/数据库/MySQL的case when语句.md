# MySQL 中 CASE WHEN 语句用法总结

## 一、概述

`CASE WHEN` 是 MySQL 中的条件表达式，用于在 SQL 查询中实现条件分支逻辑，其功能类似于编程语言中的 `if...else` 或 `switch...case` 结构。

需要注意：

- `CASE` 本质上是一个表达式（expression），而不是流程控制语句。
- 可以出现在 `SELECT`、`WHERE`、`ORDER BY`、`GROUP BY`、`HAVING`、`UPDATE` 等子句中。
- 符合 SQL 标准语法，具有良好的可移植性。

---

## 二、语法结构

MySQL 中 `CASE` 表达式分为两种类型：

---

### 1. 简单 CASE 表达式（Simple CASE）

用于等值匹配。

语法结构：

```sql
CASE expression
    WHEN value1 THEN result1
    WHEN value2 THEN result2
    ...
    ELSE result_default
END
```

执行逻辑：

1. 计算 `expression` 的值。
2. 依次与各 `WHEN` 后的值进行等值比较。
3. 匹配成功则返回对应 `THEN` 的结果。
4. 若无匹配项，则返回 `ELSE`。
5. 若未定义 `ELSE` 且无匹配，则返回 `NULL`。

示例：

```sql
SELECT 
    student_id,
    CASE gender
        WHEN 'M' THEN 'Male'
        WHEN 'F' THEN 'Female'
        ELSE 'Unknown'
    END AS gender_desc
FROM students;
```

---

### 2. 搜索 CASE 表达式（Searched CASE）

用于布尔条件判断，适用于范围判断或复杂逻辑，使用更为广泛。

语法结构：

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ...
    ELSE result_default
END
```

执行逻辑：

1. 按顺序计算每个 `WHEN` 后的布尔表达式。
2. 第一个为 `TRUE` 的条件被执行。
3. 后续条件不再判断。
4. 若无任何条件满足，则执行 `ELSE`。
5. 若无 `ELSE` 且无匹配，则返回 `NULL`。

示例：

```sql
SELECT
    student_id,
    score,
    CASE
        WHEN score >= 90 THEN 'A'
        WHEN score >= 80 THEN 'B'
        WHEN score >= 70 THEN 'C'
        ELSE 'D'
    END AS grade
FROM scores;
```

---

## 三、典型应用场景

### 1. 在 SELECT 中构造派生列

```sql
SELECT
    order_id,
    CASE
        WHEN amount >= 1000 THEN 'High'
        ELSE 'Normal'
    END AS order_level
FROM orders;
```

---

### 2. 条件聚合（数据分析高频用法）

#### 条件计数

```sql
SELECT
    COUNT(*) AS total_count,
    SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) AS male_count,
    SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) AS female_count
FROM students;
```

等价写法（更简洁）：

```sql
SELECT
    COUNT(CASE WHEN gender = 'M' THEN 1 END) AS male_count
FROM students;
```

说明：

- `COUNT()` 会忽略 `NULL`。
- 当条件不满足时返回 `NULL`，因此不会被计入。

---

#### 条件求和

```sql
SELECT
    SUM(CASE WHEN amount >= 1000 THEN amount ELSE 0 END) AS high_amount_sum
FROM orders;
```

---

### 3. 在 ORDER BY 中自定义排序规则

```sql
SELECT *
FROM employees
ORDER BY
    CASE department
        WHEN 'IT' THEN 1
        WHEN 'HR' THEN 2
        ELSE 3
    END;
```

---

### 4. 在 UPDATE 中使用

```sql
UPDATE employees
SET salary = 
    CASE
        WHEN performance = 'A' THEN salary * 1.2
        WHEN performance = 'B' THEN salary * 1.1
        ELSE salary
    END;
```

---

## 四、执行机制与数据类型规则

### 1. 顺序执行原则

- 条件自上而下匹配。
- 匹配成功后立即返回。
- 后续条件不再执行。

---

### 2. 返回值类型规则

- 所有 `THEN` 和 `ELSE` 返回值会参与类型推断。
- 若类型不一致，MySQL 会进行隐式类型转换。
- 类型转换可能导致精度损失或逻辑错误。

示例（不推荐）：

```sql
CASE
    WHEN score >= 60 THEN 'Pass'
    ELSE 0
END
```

该表达式可能触发字符串与数值之间的隐式转换。

---

### 3. NULL 处理规则

错误写法：

```sql
WHEN column = NULL
```

正确写法：

```sql
WHEN column IS NULL
```

原因：

- `NULL` 不能使用等号比较。
- 需要使用 `IS NULL` 或 `IS NOT NULL`。

---

## 五、性能注意事项

### 1. 避免在 WHERE 中滥用 CASE

不推荐：

```sql
SELECT *
FROM orders
WHERE
    CASE
        WHEN status = 'A' THEN 1
        ELSE 0
    END = 1;
```

推荐：

```sql
SELECT *
FROM orders
WHERE status = 'A';
```

原因：

- 在 `WHERE` 子句中使用 `CASE` 可能导致索引失效。
- 会增加查询成本。

---

### 2. 条件顺序必须合理

错误示例：

```sql
CASE
    WHEN score >= 60 THEN 'Pass'
    WHEN score >= 90 THEN 'Excellent'
END
```

问题：

- 第二个条件永远不会执行。

正确写法：

```sql
CASE
    WHEN score >= 90 THEN 'Excellent'
    WHEN score >= 60 THEN 'Pass'
END
```

---

## 六、CASE 与 IF() 的比较

MySQL 提供 `IF()` 函数：

```sql
IF(condition, true_value, false_value)
```

对比：

| 特性 | CASE | IF() |
|------|------|------|
| 是否 SQL 标准 | 是 | 否 |
| 支持多条件 | 是 | 否 |
| 可读性 | 强 | 一般 |
| 复杂逻辑支持 | 强 | 弱 |

在复杂业务逻辑中，建议优先使用 `CASE`。

---

## 七、常见错误总结

1. 忘记书写 `END`。
2. 条件顺序不合理。
3. 忽略 `ELSE` 导致返回 `NULL`。
4. 使用 `=` 比较 `NULL`。
5. 在 `WHERE` 中使用 `CASE` 影响索引。
6. 返回值类型不统一导致隐式转换。

---

## 八、总结

`CASE WHEN` 是 MySQL 中实现条件逻辑的核心表达式，具有如下特征：

- 支持等值匹配与布尔条件判断。
- 可嵌套使用。
- 可与聚合函数结合实现条件统计。
- 返回值类型遵循隐式类型推断规则。
- 若无匹配且无 `ELSE`，默认返回 `NULL`。

在数据分析场景中，`CASE WHEN` 常用于：

- 数据分类
- 条件统计
- 条件求和
- 自定义排序
- 数据清洗与特征构造

熟练掌握 `CASE WHEN` 是 SQL 数据分析能力的重要基础。
