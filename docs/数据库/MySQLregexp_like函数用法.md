# MySQL `REGEXP_LIKE()` 函数详解

---

# 1. 什么是 REGEXP_LIKE()

`REGEXP_LIKE()` 是 MySQL 中用于：

```text
正则表达式匹配
```

的函数。

作用：

```text
判断某个字符串是否符合指定的正则规则。
```

返回值：

- 匹配成功 → `1`
- 匹配失败 → `0`

---

# 2. 基本语法

```sql
REGEXP_LIKE(字符串, 正则表达式)
```

或者：

```sql
REGEXP_LIKE(字符串, 正则表达式, 匹配模式)
```

---

# 3. 最基础示例

## 判断是否包含数字

```sql
SELECT REGEXP_LIKE('abc123', '[0-9]');
```

结果：

```text
1
```

因为字符串中包含数字。

---

## 不包含数字

```sql
SELECT REGEXP_LIKE('abcdef', '[0-9]');
```

结果：

```text
0
```

---

# 4. 在 WHERE 中使用（最重要）

这是实际开发中最常见用法。

## 查询手机号格式正确的数据

```sql
SELECT *
FROM users
WHERE REGEXP_LIKE(phone, '^1[3-9][0-9]{9}$');
```

含义：

```text
必须以1开头
第二位是3~9
后面还有9位数字
```

---

## 查询邮箱格式

```sql
SELECT *
FROM users
WHERE REGEXP_LIKE(email, '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
```

---

# 5. 常见正则符号

| 符号 | 含义 |
|---|---|
| `.` | 任意单个字符 |
| `*` | 前面的字符出现0次或多次 |
| `+` | 前面的字符出现1次或多次 |
| `?` | 前面的字符出现0次或1次 |
| `^` | 开头 |
| `$` | 结尾 |
| `[]` | 字符范围 |
| `[^]` | 排除字符 |
| `{n}` | 出现n次 |
| `{n,m}` | 出现n~m次 |
| `|` | 或 |
| `()` | 分组 |

---

# 6. 常用案例

---

## （1）必须全部是数字

```sql
SELECT REGEXP_LIKE('12345', '^[0-9]+$');
```

结果：

```text
1
```

---

## （2）必须全部是字母

```sql
SELECT REGEXP_LIKE('abcDEF', '^[A-Za-z]+$');
```

---

## （3）判断是否以字母开头

```sql
SELECT REGEXP_LIKE('A123', '^[A-Za-z]');
```

---

## （4）判断是否以数字结尾

```sql
SELECT REGEXP_LIKE('abc123', '[0-9]$');
```

---

## （5）判断长度

### 长度为6位数字

```sql
SELECT REGEXP_LIKE('123456', '^[0-9]{6}$');
```

---

## （6）包含指定单词

```sql
SELECT REGEXP_LIKE('I love mysql', 'mysql');
```

---

# 7. 匹配模式（第三个参数）

语法：

```sql
REGEXP_LIKE(str, pattern, match_type)
```

---

## 常用匹配模式

| 模式 | 含义 |
|---|---|
| `i` | 忽略大小写 |
| `c` | 区分大小写 |
| `m` | 多行模式 |
| `n` | `.` 匹配换行符 |

---

## 忽略大小写

```sql
SELECT REGEXP_LIKE('MYSQL', 'mysql', 'i');
```

结果：

```text
1
```

---

## 区分大小写

```sql
SELECT REGEXP_LIKE('MYSQL', 'mysql', 'c');
```

结果：

```text
0
```

---

# 8. REGEXP_LIKE 和 LIKE 的区别

| LIKE | REGEXP_LIKE |
|---|---|
| 简单模糊匹配 | 正则匹配 |
| 功能较弱 | 功能非常强 |
| `%` `_` | 完整正则表达式 |
| 性能更好 | 功能更灵活 |

---

## LIKE 示例

```sql
WHERE name LIKE 'Tom%'
```

只能简单匹配。

---

## REGEXP_LIKE 示例

```sql
WHERE REGEXP_LIKE(name, '^Tom[0-9]+$')
```

可以实现复杂规则。

---

# 9. 实际开发高频案例

---

## 用户名规则

要求：

```text
6~12位
只能字母数字下划线
必须字母开头
```

SQL：

```sql
SELECT *
FROM users
WHERE REGEXP_LIKE(username,
'^[A-Za-z][A-Za-z0-9_]{5,11}$');
```

---

## 查询包含中文的数据

```sql
SELECT *
FROM table_name
WHERE REGEXP_LIKE(col_name, '[一-龥]');
```

---

## 查询重复字符

例如：

```text
aaaa
1111
```

```sql
SELECT *
FROM table_name
WHERE REGEXP_LIKE(col_name, '(.)\1');
```

---

# 10. 注意事项

---

## （1）MySQL 8.0 才正式支持 REGEXP_LIKE

低版本通常使用：

```sql
REGEXP
```

例如：

```sql
WHERE name REGEXP '^A'
```

---

## （2）正则性能较低

不要对：

- 超大表
- 高频查询

滥用正则。

因为：

```text
正则通常无法有效利用索引。
```

---

## （3）复杂正则可读性很差

建议：

- 加注释
- 分步骤处理
- 不要写超长正则

---

# 11. 高频面试题

---

## 问：REGEXP_LIKE 和 LIKE 的区别？

答：

```text
LIKE 是简单模糊匹配；
REGEXP_LIKE 是正则表达式匹配，功能更强。
```

---

## 问：为什么 REGEXP_LIKE 性能差？

答：

```text
因为正则匹配通常无法走普通索引，
需要逐行扫描和计算。
```

---

# 12. 一句话总结

```text
LIKE 适合简单模糊查询；
REGEXP_LIKE 适合复杂规则校验。
```

---

# 13. 最常用模板

## 手机号

```sql
'^1[3-9][0-9]{9}$'
```

---

## 邮箱

```sql
'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
```

---

## 全数字

```sql
'^[0-9]+$'
```

---

## 全字母

```sql
'^[A-Za-z]+$'
```

---

## 用户名

```sql
'^[A-Za-z][A-Za-z0-9_]{5,11}$'
```

---
