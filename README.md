# Pseudo Localization Demo

一个伪本地化演示

伪本地化 (pseudo-localization, 语言环境名称为 qps-ploc, qps-plocm, qps-ploca, en-XA, en-XB), 是模拟本地化过程的一种方式。而通过模拟本地化过程, 能够有效地调查在本地化中出现的问题 (如字符无法正常显示, 或因字符串过长而导致语段显示不完整等)。

在伪本地化过程中, 英文字母会被替换为来自其他语言的重音符号和字符 (例如, 字母 a 可以被 αäáàāāǎǎăăåå 中的任何一个替换), 还会添加分隔符等以增加字符串长度。
举例: "Windows 照片库 (Windows Photo Gallery)"→" [1iaT9][ Ẅĭпðøωś Þнôтŏ Ģάŀļєяÿ !!! !] "

该网页演示了伪本地化的一部分, 即用不同的字符替换英文字母和添加分隔符。

此工具不会上传你的任何数据。

## 使用

如果想要在线预览, 请访问: https://suntrise.github.io/pseudo/

如果需要在本地使用, 且您安装了 Python 3, 可以直接执行:
~~~bash
python3 -m http.server 8000
~~~
在 `localhost:8000` 中预览页面

## 开发

### 环境准备

| 工具 | 用途 | 安装方式 |
|------|------|----------|
| Python 3 | 运行检查脚本, 或启用本地服务器 | [python.org](https://www.python.org/) |

### 进行本地化

翻译文件位于 `data/i18n.json`, 您可以简单的编辑此 JSON 文件进行进行开发。

编辑翻译后, 请运行 i18n 检查以确保翻译质量:

~~~bash
python3 tests/check_i18n.py
~~~

检查内容包括:
- 全角字符检测
- 缺失/多余的翻译键
- 空值检测
- 占位符一致性
- 首尾空白字符

### 开发功能

开发完成后, 请执行以下检查确保代码质量:

~~~bash
# i18n 翻译检查
python3 tests/check_i18n.py

# JSON 文件检查 (语法 + 重复键)
python3 tests/check_json.py

# 文件尾换行符检查
python3 tests/check_trailing_newline.py

# JavaScript 代码检查 (首次运行会自动下载 Biome)
python3 tests/check_biome.py
~~~

> **Windows 用户** 可能需要将 `python3` 替换为 `python`

### 检查说明

| 检查项 | 脚本 | 说明 |
|--------|------|------|
| i18n 翻译 | `tests/check_i18n.py` | 检查翻译完整性、占位符一致性、全角字符等 |
| JSON 验证 | `tests/check_json.py` | 检查 JSON 语法和重复键 |
| 换行符 | `tests/check_trailing_newline.py` | 检查文本文件是否以换行符结尾 |
| JS 代码 | `tests/check_biome.py` | 检查 JavaScript 代码质量 (自动下载 Biome)|

所有检查会在 Pull Request 时自动运行。
