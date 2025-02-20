export async function onRequestPost(context) {
    try {
        const { request } = context;
        const { baseUrl, apiKey, model, testType } = await request.json();

        // 构建请求参数
        const requestParams = {
            model,
            messages: [
                {
                    role: "user",
                    content: "not reverse"
                }
            ],
            temperature: 0.7
        };

        // 根据测试类型添加特定参数
        switch (testType) {
            case 'max_tokens':
                requestParams.max_tokens = 6;
                break;
            case 'logprobs':
                requestParams.logprobs = true;
                break;
            case 'n':
                requestParams.n = 2;
                break;
            case 'stop':
                requestParams.stop = ["not"];
                break;
        }

        // 发送请求到目标 API
        const response = await fetch(`https://${baseUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestParams)
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
} 