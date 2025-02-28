# LLM API Reverse Engineering Detection Tool

A tool for detecting and comparing whether Large Language Model APIs are reverse-engineered implementations, supporting major models like OpenAI, Claude, and Gemini.

## Features

- 🔍 Multi-Provider API Detection
  - OpenAI
  - Claude
  - Gemini

- 🛠 Comprehensive Parameter Testing
  - max_tokens parameter validation
  - logprobs parameter testing
  - n parameter verification
  - stop sequence testing
  - function_call/tools parameter validation
  - response_format parameter testing
  - image input support testing

- 📊 Intuitive Results Display
  - Real-time API request information
  - Response comparison analysis
  - Official examples reference
  - Toggle between concise/complete responses

## Tech Stack

- Frontend Framework: Vue 3
- UI Components: Tailwind CSS
- Build Tool: Vite
- Internationalization: Vue I18n

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Usage Guide

1. Select a model provider (OpenAI/Claude/Gemini)
2. Choose parameter types to test
3. Configure API settings
   - API Base URL
   - API Key
   - Model name
4. Click "Start Detection" button
5. Review test results and comparison data

## Parameter Details

### OpenAI
- max_tokens: Controls the maximum length of generated text
- logprobs: Retrieves token probability information
- n: Generates multiple response candidates
- stop: Sets conditions for stopping generation
- function_call: Function calling capability
- response_format: Response format control
- image_url: Image input support

### Claude
- max_tokens: Output length limitation
- stop: Stop sequence configuration
- function_call: Tool calling functionality

### Gemini
- max_tokens: Output length limitation
- codeExecution: Code execution tool
- googleSearch: Search tool
- response_format: Response format control

## API Documentation References

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference/chat)
- [Claude API Documentation](https://docs.anthropic.com/en/api/messages)
- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)

## License

MIT License