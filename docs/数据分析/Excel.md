# Excel 数据清洗与分析常用函数与方法

本文整理 Excel 在数据清洗、分析和处理方面常用函数、方法及实用知识点，覆盖基础函数、文本处理、日期时间处理、查找引用、条件统计、数据透视与可视化等内容。

---

## 一、数据清洗函数

### 1. 文本处理

| 功能 | 函数 | 说明 |
|------|------|------|
| 去除空格 | TRIM(text) | 去除文本首尾及重复空格 |
| 转大写 | UPPER(text) | 将文本转换为大写 |
| 转小写 | LOWER(text) | 将文本转换为小写 |
| 首字母大写 | PROPER(text) | 将每个单词首字母大写 |
| LEFT/RIGHT | LEFT(text, n), RIGHT(text, n) | 提取左/右 n 个字符 |
| MID | MID(text, start, n) | 从指定位置提取 n 个字符 |
| 替换 | REPLACE(text, start, num_chars, new_text) | 替换指定位置字符 |
| 替换（文本） | SUBSTITUTE(text, old_text, new_text, [instance]) | 替换指定文本内容 |
| 查找 | FIND/SEARCH | 查找子字符串位置，区分大小写/FIND 不区分 |

---

### 2. 数据类型与转换

| 功能 | 函数/方法 | 说明 |
|------|-----------|------|
| 转换为文本 | TEXT(value, format_text) | 格式化数字、日期为文本 |
| 转换为数值 | VALUE(text) | 将文本数字转换为数值 |
| 转换为日期 | DATEVALUE(text) | 将文本日期转换为 Excel 日期 |
| 转换为时间 | TIMEVALUE(text) | 将文本时间转换为 Excel 时间 |

---

### 3. 数据清理工具

- **查找和替换**（Ctrl+H）：批量替换错误值或特定字符  
- **删除重复值**（Data → Remove Duplicates）  
- **文本到列**（Data → Text to Columns）：分割数据列  
- **数据验证**（Data Validation）：限制输入范围或格式  
- **条件格式**（Conditional Formatting）：高亮异常或关键值  

---

## 二、逻辑与条件函数

| 功能 | 函数 | 说明 |
|------|------|------|
| 条件判断 | IF(logical_test, value_if_true, value_if_false) | 条件判断 |
| 多条件判断 | AND(condition1, condition2...), OR(condition1, condition2...) | 多条件组合 |
| 嵌套条件 | IF(AND(...),...,IF(...)) | 多层条件处理 |
| 空值判断 | ISBLANK(value) | 判断单元格是否为空 |
| 错误处理 | IFERROR(value, value_if_error) | 避免公式报错 |

---

## 三、查找与引用函数

| 功能 | 函数 | 说明 |
|------|------|------|
| 精确查找 | VLOOKUP(lookup_value, table_array, col_index, [range_lookup]) | 垂直查找 |
| 精确查找 | HLOOKUP(lookup_value, table_array, row_index, [range_lookup]) | 水平查找 |
| 动态查找 | INDEX(array, row_num, [col_num]) | 返回指定位置值 |
| 匹配位置 | MATCH(lookup_value, lookup_array, [match_type]) | 返回匹配位置 |
| 联合查找 | INDEX + MATCH | 替代 VLOOKUP，可向左查找 |
| 多条件查找 | FILTER(array, include, [if_empty]) | Excel 365 动态数组函数 |
| 多条件返回 | XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode]) | Excel 365 替代 VLOOKUP |

---

## 四、统计分析函数

| 功能 | 函数 | 说明 |
|------|------|------|
| 计数 | COUNT(range) | 统计数值单元格数量 |
| 非空计数 | COUNTA(range) | 统计非空单元格数量 |
| 条件计数 | COUNTIF(range, criteria) | 按条件计数 |
| 多条件计数 | COUNTIFS(criteria_range1, criteria1, ...) | 多条件计数 |
| 求和 | SUM(range) | 数值求和 |
| 条件求和 | SUMIF(range, criteria, [sum_range]) | 条件求和 |
| 多条件求和 | SUMIFS(sum_range, criteria_range1, criteria1, ...) | 多条件求和 |
| 平均值 | AVERAGE(range) | 平均值 |
| 条件平均 | AVERAGEIF(range, criteria, [average_range]) | 条件平均 |
| 多条件平均 | AVERAGEIFS(average_range, criteria_range1, criteria1, ...) | 多条件平均 |
| 最大/最小 | MAX(range), MIN(range) | 返回最大值/最小值 |
| 中位数 | MEDIAN(range) | 返回中位数 |
| 百分位 | PERCENTILE.EXC / PERCENTILE.INC | 分位数计算 |
| 标准差 | STDEV.P / STDEV.S | 总体或样本标准差 |
| 方差 | VAR.P / VAR.S | 总体或样本方差 |

---

## 五、日期与时间函数

| 功能 | 函数 | 说明 |
|------|------|------|
| 当前日期 | TODAY() | 返回当前日期 |
| 当前时间 | NOW() | 返回当前日期时间 |
| 提取年份 | YEAR(date) | 提取年份 |
| 提取月份 | MONTH(date) | 提取月份 |
| 提取日 | DAY(date) | 提取日期 |
| 提取周 | WEEKDAY(date, [return_type]) | 返回星期几 |
| 日期差 | DATEDIF(start_date, end_date, "unit") | 计算日期间隔 |
| 加减日期 | date + n, date - n | 日期运算 |
| 时间差 | end_time - start_time | 时间差计算 |

---

## 六、数据透视与可视化

- **数据透视表（PivotTable）**：
  - 行/列维度汇总
  - 支持多层分组和聚合
  - 可计算平均、计数、求和等
- **切片器（Slicer）**：快速筛选数据透视表
- **条件格式（Conditional Formatting）**：高亮异常值、趋势
- **图表**：
  - 折线图、柱状图、条形图、散点图、饼图
  - 可与数据透视表联动

---

## 七、其他实用技巧

- **命名区域（Named Ranges）**：便于公式引用
- **动态数组函数（Excel 365）**：
  - UNIQUE(), SORT(), FILTER(), SEQUENCE()
- **文本连接**：
  - CONCAT(), TEXTJOIN()
- **公式追踪与调试**：
  - Show Formulas, Evaluate Formula, Trace Dependents/Precedents
- **数据验证（Data Validation）**：
  - 限制输入范围
  - 防止错误数据

---

## 八、Excel 数据清洗与分析流程示例

1. **导入数据**  
   - CSV / Excel 文件 / 数据库导入
2. **初步清洗**  
   - 删除重复行、空值处理、格式统一
3. **数据转换**  
   - 文本拆分、日期转换、类型转换
4. **数据分析**  
   - 条件统计、汇总、透视表分析
5. **可视化**  
   - 折线图、柱状图、饼图、条件格式高亮
6. **结果输出**  
   - 表格报表、图表报表、可交互仪表盘
