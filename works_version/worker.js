const { HTML_TEMPLATE } = require('./templates');
const { EXAMPLES } = require('./examples');

// API请求配置
const API_CONFIG = {
    DEFAULT_MODEL: 'gpt-4o-2024-11-20',
    TEST_PROMPT: "repeat ' deepseek number 1 ' 20 times",
    TEST_PARAMS: {
        max_tokens: { max_tokens: 9 },
        logprobs: { logprobs: true },
        n: { n: 2 },
        stop: { stop: ["stop"] }
    }
};

// 处理API测试请求
async function handleApiTest(request) {
    try {
        const { baseUrl, apiKey, model, testType } = await request.json();
        const fullBaseUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
        
        const requestBody = {
            model: model || API_CONFIG.DEFAULT_MODEL,
            messages: [{
                role: "user",
                content: API_CONFIG.TEST_PROMPT
            }],
            ...API_CONFIG.TEST_PARAMS[testType]
        };
        
        const response = await fetch(`${fullBaseUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// 路由处理
async function handleRequest(request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api_request' && request.method === 'POST') {
        return handleApiTest(request);
    }
    
    // 返回主页
    return new Response(HTML_TEMPLATE, {
        headers: { 'Content-Type': 'text/html' }
    });
}

// 注册事件监听器
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});
