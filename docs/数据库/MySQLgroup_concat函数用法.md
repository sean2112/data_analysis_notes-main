# MySQL `GROUP_CONCAT()` 函数详解

> `GROUP_CONCAT()` 是 MySQL 中非常常用的聚合函数，用于将同一分组中的多个字段值拼接成一个字符串。

---

# 一、基本作用

`GROUP_CONCAT()` 可以：

- 将多行数据合并成一行
- 常用于分组后的字段拼接
- 常搭配 `GROUP BY` 使用

---

# 二、基础语法

```sql
GROUP_CONCAT([DISTINCT] 字段名
             [ORDER BY 字段 ASC/DESC]
             [SEPARATOR '分隔符'])
```

---

# 三、最基础用法

## 示例表：students

| id | class | name |
|---|---|---|
| 1 | 一班 | 张三 |
| 2 | 一班 | 李四 |
| 3 | 二班 | 王五 |

---

## 查询每个班级的学生名单

```sql
SELECT
    class,
    GROUP_CONCAT(name) AS student_list
FROM students
GROUP BY class;
```

---

## 查询结果

| class | student_list |
|---|---|
| 一班 | 张三,李四 |
| 二班 | 王五 |

---

# 四、指定分隔符

默认分隔符是逗号 `,`

可以通过 `SEPARATOR` 修改。

---

## 示例

```sql
SELECT
    class,
    GROUP_CONCAT(name SEPARATOR ' | ') AS student_list
FROM students
GROUP BY class;
```

---

## 结果

```text
一班 -> 张三 | 李四
二班 -> 王五
```

---

# 五、去重 DISTINCT

如果字段有重复值，可以使用 `DISTINCT` 去重。

---

## 示例

```sql
SELECT
    GROUP_CONCAT(DISTINCT name)
FROM students;
```

---

# 六、排序 ORDER BY

可以在拼接前排序。

---

## 示例：按名字降序拼接

```sql
SELECT
    class,
    GROUP_CONCAT(name ORDER BY name DESC)
FROM students
GROUP BY class;
```

---

# 七、组合使用（重点）

实际开发中经常：

- 去重
- 排序
- 自定义分隔符

一起使用。

---

## 综合示例

```sql
SELECT
    class,
    GROUP_CONCAT(
        DISTINCT name
        ORDER BY name ASC
        SEPARATOR ' / '
    ) AS student_list
FROM students
GROUP BY class;
```

---

# 八、常见应用场景

---

## 1. 合并标签

### 示例

```sql
SELECT
    product_id,
    GROUP_CONCAT(tag_name)
FROM product_tags
GROUP BY product_id;
```

---

## 2. 合并用户角色

```sql
SELECT
    user_id,
    GROUP_CONCAT(role_name)
FROM user_roles
GROUP BY user_id;
```

---

## 3. 电商订单商品汇总

```sql
SELECT
    order_id,
    GROUP_CONCAT(product_name SEPARATOR '; ')
FROM order_detail
GROUP BY order_id;
```

---

# 九、GROUP_CONCAT() + GROUP BY（核心理解）

`GROUP_CONCAT()` 本质是：

> 对每个分组内的数据进行字符串聚合。

因此：

```sql
GROUP_CONCAT()
```

通常搭配：

```sql
GROUP BY
```

一起使用。

---

# 十、长度限制（重要）

`GROUP_CONCAT()` 有默认长度限制。

默认：

```sql
1024
```

如果拼接内容太长，会被截断。

---

## 查看当前限制

```sql
SHOW VARIABLES LIKE 'group_concat_max_len';
```

---

## 修改限制

```sql
SET SESSION group_concat_max_len = 100000;
```

---

# 十一、常见错误

---

## 1. 忘记 GROUP BY

错误示例：

```sql
SELECT
    class,
    GROUP_CONCAT(name)
FROM students;
```

可能报错：

```text
Expression #1 of SELECT list is not in GROUP BY clause
```

---

## 正确写法

```sql
SELECT
    class,
    GROUP_CONCAT(name)
FROM students
GROUP BY class;
```

---

# 十二、面试常考点

---

## Q1：`GROUP_CONCAT()` 的作用是什么？

答：

> 将多行字段值拼接成一个字符串。

---

## Q2：默认分隔符是什么？

答：

```text
逗号 ,
```

---

## Q3：如何去重？

答：

```sql
GROUP_CONCAT(DISTINCT 字段)
```

---

## Q4：如何自定义分隔符？

答：

```sql
SEPARATOR '分隔符'
```

---

# 十三、总结

`GROUP_CONCAT()` 是 MySQL 中：

- 最常用的聚合函数之一
- 非常适合做：
  - 标签合并
  - 名单拼接
  - 订单汇总
  - 多行转一行

---

# 十四、万能模板

```sql
SELECT
    分组字段,
    GROUP_CONCAT(
        DISTINCT 要拼接的字段
        ORDER BY 排序字段 ASC
        SEPARATOR '分隔符'
    ) AS 新字段名
FROM 表名
GROUP BY 分组字段;
```
