<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">{{ t('message.title') }}</h1>
    
    <!-- 上半部分：参数配置和响应结果 -->
    <div class="flex gap-6 mb-6">
      <!-- 左侧：配置表单 -->
      <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <form @submit.prevent="handleCheck" class="space-y-4">
          <div class="space-y-4">
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

            <!-- 参数检测说明 -->
            <div v-if="currentDescription" class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 class="font-bold text-blue-800 mb-2">{{ currentDescription.title }}</h3>
              <p class="text-blue-700 mb-2">{{ currentDescription.description }}</p>
              <ul class="list-disc list-inside text-blue-600 space-y-1">
                <li v-for="point in currentDescription.focus_points" :key="point">{{ point }}</li>
              </ul>
            </div>

            <div>
              <label class="block mb-1">{{ t('message.model') }}</label>
              <input 
                type="text" 
                v-model="formState.model" 
                class="w-full border p-2 rounded"
                :placeholder="t('message.modelPlaceholder')" />
            </div>

            <div>
              <label class="block mb-1">{{ t('message.apiBaseUrl') }}</label>
              <input 
                type="text" 
                v-model="formState.baseUrl" 
                class="w-full border p-2 rounded"
                :placeholder="t('message.apiBaseUrlPlaceholder')" />
            </div>

            <div>
              <label class="block mb-1">{{ t('message.apiKey') }}</label>
              <input 
                type="password" 
                v-model="formState.apiKey" 
                class="w-full border p-2 rounded"
                :placeholder="t('message.apiKeyPlaceholder')" />
            </div>

            <div class="text-center">
              <button 
                type="submit" 
                class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                :disabled="loading">
                {{ t('message.startCheck') }}
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- 右侧：检测结果 -->
      <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-2">{{ t('message.requestResult') }}</h2>
        <div v-if="result" class="h-[calc(100%-2rem)] overflow-auto">
          <pre class="bg-gray-100 p-4 rounded">{{ displayResult }}</pre>
          <div class="flex gap-2 mt-2">
            <button 
              @click="toggleResultView('full')"
              class="text-blue-500 hover:text-blue-700 text-sm">
              {{ t('message.showFullResponse') }}
            </button>
            <button 
              @click="toggleResultView('brief')"
              class="text-blue-500 hover:text-blue-700 text-sm">
              {{ t('message.showBriefResponse') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 下半部分：示例对比 -->
    <div class="flex gap-6">
      <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-2">{{ t('message.reverseExample') }}</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-[40vh]">{{ displayReverseExample }}</pre>
        <div class="flex gap-2 mt-2">
          <button 
            @click="toggleReverseView('full')"
            class="text-blue-500 hover:text-blue-700 text-sm">
            {{ t('message.showFullResponse') }}
          </button>
          <button 
            @click="toggleReverseView('brief')"
            class="text-blue-500 hover:text-blue-700 text-sm">
            {{ t('message.showBriefResponse') }}
          </button>
        </div>
      </div>
      <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-2">{{ t('message.officialExample') }}</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-[40vh]">{{ displayOfficialExample }}</pre>
        <div class="flex gap-2 mt-2">
          <button 
            @click="toggleOfficialView('full')"
            class="text-blue-500 hover:text-blue-700 text-sm">
            {{ t('message.showFullResponse') }}
          </button>
          <button 
            @click="toggleOfficialView('brief')"
            class="text-blue-500 hover:text-blue-700 text-sm">
            {{ t('message.showBriefResponse') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import examplesData from '../data/examples.json'
import promptsData from '../data/prompts.json'
import descriptionsData from '../data/descriptions.json'

const { t } = useI18n()
const loading = ref(false)
const result = ref(null)

const formState = reactive({
  provider: 'openai',
  testParam: 'max_tokens',
  model: '',
  baseUrl: '',
  apiKey: '',
})

// 视图状态
const viewState = reactive({
  result: 'brief',
  reverse: 'brief',
  official: 'brief'
})

// 当前参数的检测说明
const currentDescription = computed(() => {
  return descriptionsData[formState.provider]?.[formState.testParam]
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

// 显示处理函数
const formatResponse = (data, type) => {
  if (!data) return ''
  return type === 'brief' && data.choices
    ? JSON.stringify(data.choices, null, 2)
    : JSON.stringify(data, null, 2)
}

// 计算属性：显示结果
const displayResult = computed(() => {
  return formatResponse(result.value, viewState.result)
})

const displayReverseExample = computed(() => {
  const data = examplesData[formState.provider]?.[formState.testParam]?.reverse
  return formatResponse(data, viewState.reverse)
})

const displayOfficialExample = computed(() => {
  const data = examplesData[formState.provider]?.[formState.testParam]?.official
  return formatResponse(data, viewState.official)
})

// 切换视图函数
const toggleResultView = (type) => viewState.result = type
const toggleReverseView = (type) => viewState.reverse = type
const toggleOfficialView = (type) => viewState.official = type

// 处理提供商变化
const handleProviderChange = () => {
  formState.testParam = availableParams.value[0]?.value || ''
}

// 处理参数变化
const handleParamChange = () => {
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