# 🔍 reverse-check：LLM API 逆向检测工具

**项目地址**：[GitHub](https://github.com/star5o/reverse-check) | [网站](https://reverse-check.vercel.app/)

本工具是一个基于是否支持官方参数的逆向检测工具。不能通过本工具检测的API极大概率是逆向的。

目前项目处于初步阶段，暂时需要人工对比响应结果与示例进行判断。

## 功能特性

- 🔍 支持多种模型提供商的API检测
  - OpenAI
  - Claude
  - Gemini

- 🛠 丰富的参数测试选项
  - max_tokens参数检测
  - logprobs参数检测
  - n参数检测
  - stop参数检测
  - function_call/tools参数检测
  - response_format参数检测
  - 图像输入检测

- 📊 直观的结果展示
  - API请求信息实时展示
  - 响应结果对比分析
  - 官方示例参考
  - 简洁/完整响应切换

## 技术栈

- 前端框架：Vue 3
- UI组件：Tailwind CSS
- 构建工具：Vite

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

## 使用说明

1. 选择模型提供商（OpenAI/Claude/Gemini）
2. 选择要测试的参数类型
3. 填写API配置信息
   - API Base URL
   - API Key
   - 模型名称
4. 点击「开始检测」按钮
5. 查看检测结果和对比信息

## 参数解释

### OpenAI 参数

| **参数**         | **解释**                                                                 |
|------------------|--------------------------------------------------------------------------|
| **max_tokens**   | 官方API严格遵守token限制（如max_tokens=10），逆向的会忽略限制。     |
| **logprobs**     | 官方API返回每个token的logprobs信息，逆向的不支持。                     |
| **n**            | 官方API返回多个回答（如n=2），逆向的只返回一个回答。                   |
| **stop**         | 官方API遇到停止词立即停止生成，逆向的会忽略停止词输出完整内容。           |
| **image_url**    | 官方API正确处理图像URL并生成描述，逆向的无法处理图像。        |
| **function_call**| 官方API返回json格式的函数调用，逆向的不会调用函数。                    |
| **response_format**| 官方API返回指定格式（如JSON），逆向的只返回字符串。                    |

### Claude 参数

| **参数**         | **解释**                                                                 |
|------------------|--------------------------------------------------------------------------|
| **max_tokens**   | 官方API严格遵守token限制（如max_tokens=10），逆向会忽略限制。     |
| **stop**         | 官方API遇到停止词立即停止生成，逆向会忽略停止词输出完整内容。           |
| **function_call**| 官方API返回json格式的函数调用，逆向的不会调用函数。                    |

### Gemini 参数

| **参数**         | **解释**                                                                 |
|------------------|--------------------------------------------------------------------------|
| **max_tokens**   | 官方API严格遵守token限制（如max_tokens=10），逆向会忽略限制。     |
| **codeExecution**| 官方API内置代码执行工具，逆向实现无法执行代码来获取准确结果。        |
| **googleSearch** | 官方API正确调用谷歌搜索并返回结果，逆向实现无法调用谷歌搜索工具。           |
| **response_format**| 官方API返回指定格式（如JSON），逆向实现只返回字符串。                    |


## TODO

1. 实现自动化判断是否逆向
2. 实现与Uptime Kuma联动，实现持续监测

## API文档参考

- [OpenAI API文档](https://platform.openai.com/docs/api-reference/chat)
- [Claude API文档](https://docs.anthropic.com/en/api/messages)
- [Gemini API文档](https://ai.google.dev/gemini-api/docs?hl=zh-cn)

## 开源协议

MIT License