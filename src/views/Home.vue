<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h1 class="text-2xl font-bold mb-6 text-center">{{ t('message.title') }}</h1>
      
      <!-- 配置表单 -->
      <form @submit.prevent="handleCheck" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block mb-1">{{ t('message.modelProvider') }}</label>
            <select 
              v-model="formState.provider" 
              @change="handleProviderChange"
              class="w-full border p-2 rounded">
              <option value="openai">OpenAI</option>
              <option value="claude">Claude</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>
          
          <div>
            <label class="block mb-1">{{ t('message.testParams') }}</label>
            <select 
              v-model="formState.testParam" 
              @change="handleParamChange"
              class="w-full border p-2 rounded">
              <option v-for="param in availableParams" :key="param.value" :value="param.value">
                {{ param.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block mb-1">{{ t('message.apiBaseUrl') }}</label>
            <input 
              type="text" 
              v-model="formState.baseUrl" 
              placeholder="例如：api.openai.com"
              class="w-full border p-2 rounded"
            />
          </div>
          
          <div>
            <label class="block mb-1">{{ t('message.apiKey') }}</label>
            <input 
              type="password" 
              v-model="formState.apiKey"
              class="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label class="block mb-1">{{ t('message.model') }}</label>
          <input 
            type="text" 
            v-model="formState.model" 
            placeholder="例如：gpt-4o-2024-11-20"
            class="w-full border p-2 rounded"
          />
        </div>

        <div class="text-center">
          <button 
            type="submit" 
            :disabled="loading"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed">
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ t('message.startCheck') }}
          </button>
        </div>
      </form>
    </div>

    <!-- 示例对比区域 -->
    <div class="flex gap-6 mb-6">
      <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-2">{{ t('message.reverseExample') }}</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-[calc(40vh-100px)]">{{ JSON.stringify(currentReverseExample, null, 2) }}</pre>
      </div>
      <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-2">{{ t('message.officialExample') }}</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-[calc(40vh-100px)]">{{ JSON.stringify(currentOfficialExample, null, 2) }}</pre>
      </div>
    </div>

    <!-- 检测结果区域 -->
    <div v-if="result" class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-bold mb-2">{{ t('message.requestResult') }}</h2>
      <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-[calc(50vh-150px)]">{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import examplesData from '../data/examples.json'

const { t } = useI18n()
const loading = ref(false)
const result = ref(null)

const formState = reactive({
  provider: 'openai',
  testParam: 'max_tokens',
  baseUrl: '',
  apiKey: '',
  model: ''
})

// 定义各提供商的可用参数
const providerParams = {
  openai: [
    { value: 'max_tokens', label: 'max_tokens参数' },
    { value: 'logprobs', label: 'logprobs参数' },
    { value: 'n', label: 'n参数' },
    { value: 'stop', label: 'stop参数' },
    { value: 'tool_choice', label: 'tool_choice参数' },
    { value: 'tool_function', label: 'tool_function参数' },
    { value: 'response_format', label: 'response_format参数' },
    { value: 'stream', label: 'stream参数' },
    { value: 'image_url', label: 'image_url参数' }
  ],
  claude: [
    { value: 'max_tokens', label: 'max_tokens参数' },
    { value: 'stop', label: 'stop参数' },
    { value: 'tool_choice', label: 'tool_choice参数' }
  ],
  gemini: [
    { value: 'max_tokens', label: 'max_tokens参数' },
    { value: 'codeExecution', label: 'codeExecution参数' },
    { value: 'response_format', label: 'response_format参数' }
  ]
}

// 计算当前可用的参数列表
const availableParams = computed(() => {
  return providerParams[formState.provider] || []
})

// 计算当前的示例数据
const currentReverseExample = computed(() => {
  return examplesData[formState.provider]?.[formState.testParam]?.reverse || {}
})

const currentOfficialExample = computed(() => {
  return examplesData[formState.provider]?.[formState.testParam]?.official || {}
})

// 处理提供商变化
const handleProviderChange = (value) => {
  formState.testParam = availableParams.value[0]?.value || ''
}

// 处理参数变化
const handleParamChange = (value) => {
  // 更新示例显示
}

// 处理检测请求
const handleCheck = async () => {
  if (!formState.baseUrl || !formState.apiKey || !formState.model) {
    alert('请填写完整的API信息')
    return
  }

  loading.value = true
  try {
    // 构建完整的API URL
    const baseUrl = formState.baseUrl.startsWith('http') ? formState.baseUrl : `https://${formState.baseUrl}`
    const apiUrl = `${baseUrl}/v1/chat/completions`

    // 从prompts.json获取对应的prompt内容
    const promptConfig = promptsData[formState.provider]?.[formState.testParam] || {}

    // 构建请求体
    const requestBody = {
      model: formState.model,
      messages: [{
        role: 'user',
        content: promptConfig.content || 'repeat \'deepseek number 1\' 10 times'
      }]
    }

    // 根据测试参数添加相应的参数
    if (promptConfig.params) {
      Object.assign(requestBody, promptConfig.params)
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${formState.apiKey}`
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || '请求失败')
    }

    result.value = await response.json()
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

pre {
  margin: 0;
  overflow-x: auto;
}
</style>