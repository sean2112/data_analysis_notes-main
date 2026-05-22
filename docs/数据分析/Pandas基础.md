# Pandas 一小时速学笔记

## 1. Pandas 是什么

Pandas 是 Python 中最常用的数据分析库。

主要作用：

- 读取数据
- 清洗数据
- 数据处理
- 数据统计分析
- 数据导出

常用于：

- 数据分析
- AI / 机器学习
- 电商数据分析
- 金融分析

安装：

```bash
pip install pandas
```

导入：

```python
import pandas as pd
```

---

# 2. Pandas 两大核心数据结构

## （1）Series

一维数据结构。

类似：

- Excel 的一列
- Python 列表

创建：

```python
import pandas as pd

s = pd.Series([10,20,30])
print(s)
```

指定索引：

```python
s = pd.Series([10,20,30], index=['a','b','c'])
```

---

## （2）DataFrame

二维表格结构。

类似：

- Excel 表
- SQL 数据表

创建：

```python
data = {
    'name':['Tom','Jack','Lucy'],
    'age':[18,20,19]
}

df = pd.DataFrame(data)
print(df)
```

---

# 3. 读取数据

## 读取 CSV

```python
df = pd.read_csv('data.csv')
```

## 读取 Excel

```python
df = pd.read_excel('data.xlsx')
```

## 查看前几行

```python
df.head()
```

## 查看后几行

```python
df.tail()
```

---

# 4. 查看数据基本信息

## 查看数据形状

```python
df.shape
```

返回：

```python
(行数, 列数)
```

---

## 查看列名

```python
df.columns
```

---

## 查看数据类型

```python
df.dtypes
```

---

## 查看总体信息

```python
df.info()
```

---

## 查看统计信息

```python
df.describe()
```

---

# 5. 数据选择

## 选择某一列

```python
df['name']
```

或者：

```python
df.name
```

---

## 选择多列

```python
df[['name','age']]
```

---

## 选择某一行

```python
df.loc[0]
```

---

## 使用 iloc 按位置选择

```python
df.iloc[0]
```

---

# 6. 数据筛选

## 条件筛选

```python
df[df['age'] > 18]
```

---

## 多条件筛选

```python
df[(df['age'] > 18) & (df['score'] > 80)]
```

注意：

- `&` 表示 and
- `|` 表示 or

---

# 7. 新增与修改数据

## 新增列

```python
df['gender'] = ['M','M','F']
```

---

## 修改数据

```python
df.loc[0,'age'] = 25
```

---

# 8. 删除数据

## 删除列

```python
df.drop('age', axis=1)
```

参数说明：

- `axis=1` 删除列
- `axis=0` 删除行

---

## 删除缺失值

```python
df.dropna()
```

---

# 9. 缺失值处理

## 查看缺失值

```python
df.isnull()
```

---

## 统计缺失值数量

```python
df.isnull().sum()
```

---

## 填充缺失值

```python
df.fillna(0)
```

---

# 10. 排序

## 升序排序

```python
df.sort_values('age')
```

---

## 降序排序

```python
df.sort_values('age', ascending=False)
```

---

# 11. 分组聚合（重点）

这是 Pandas 最核心功能之一。

## groupby

按某列分组：

```python
df.groupby('gender')
```

---

## 分组求平均值

```python
df.groupby('gender')['salary'].mean()
```

---

## 常见聚合函数

```python
mean()
sum()
max()
min()
count()
```

---

# 12. 数据去重

## 删除重复数据

```python
df.drop_duplicates()
```

---

# 13. 数据导出

## 导出 CSV

```python
df.to_csv('result.csv')
```

---

## 导出 Excel

```python
df.to_excel('result.xlsx')
```

---

# 14. 常见分析流程

一个完整的数据分析流程：

```text
读取数据
→ 查看数据
→ 清洗数据
→ 缺失值处理
→ 数据筛选
→ 分组统计
→ 数据导出
```

---

# 15. Pandas 学习重点

初学阶段最重要：

## 必会内容

- DataFrame
- read_csv()
- head()
- info()
- loc / iloc
- 条件筛选
- groupby()
- sort_values()
- dropna()

---

# 16. Pandas 和 SQL 的对应关系

| Pandas | SQL |
|---|---|
| DataFrame | 数据表 |
| groupby | GROUP BY |
| merge | JOIN |
| sort_values | ORDER BY |
| drop_duplicates | DISTINCT |
| 条件筛选 | WHERE |

---

# 17. 学习建议

建议学习顺序：

```text
Python 基础
→ NumPy
→ Pandas
→ Matplotlib
→ SQL
→ Power BI / Tableau
```

---

# 18. 一句话总结

Pandas 的核心思想：

```text
把数据当作“表格”处理。
```

具备功能：

- 读取
- 筛选
- 清洗
- 分组
- 统计

