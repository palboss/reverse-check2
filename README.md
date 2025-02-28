# 模型逆向检测工具

一个用于检测和对比大语言模型API是否为逆向实现的工具，支持OpenAI、Claude和Gemini等主流模型。

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
- 国际化：Vue I18n

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

## 参数说明

### OpenAI
- max_tokens：控制生成文本的最大长度
- logprobs：获取token的概率信息
- n：生成多个候选回复
- stop：设置停止生成的条件
- function_call：函数调用功能
- response_format：响应格式控制
- image_url：图像输入支持

### Claude
- max_tokens：输出长度限制
- stop：停止序列设置
- function_call：工具调用功能

### Gemini
- max_tokens：输出长度限制
- codeExecution：代码执行工具
- googleSearch：搜索工具
- response_format：响应格式控制

## API文档参考

- [OpenAI API文档](https://platform.openai.com/docs/api-reference/chat)
- [Claude API文档](https://docs.anthropic.com/en/api/messages)
- [Gemini API文档](https://ai.google.dev/gemini-api/docs?hl=zh-cn)


## 开源协议

MIT License