const examples = {
    max_tokens: {
        reverse: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            choices: [{
                index: 0,
                message: {
                    role: "assistant",
                    content: "not r"  // 由于max_tokens=6的限制
                }
            }],
            system_fingerprint: "fp_44709"
        },
        official: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            model: "gpt-3.5-turbo-0613",
            choices: [{
                index: 0,
                message: {
                    role: "assistant",
                    content: "not r"
                },
                finish_reason: "length"
            }],
            usage: {
                prompt_tokens: 9,
                completion_tokens: 2,
                total_tokens: 11
            }
        }
    },
    logprobs: {
        reverse: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            choices: [{
                index: 0,
                message: {
                    role: "assistant",
                    content: "not reverse"
                },
                logprobs: {
                    token_logprobs: [-0.1, -0.2, -0.3],
                    tokens: ["not", "re", "verse"]
                }
            }],
            system_fingerprint: "fp_44709"
        },
        official: {
            error: {
                message: "logprobs参数在chat completion中不支持",
                type: "invalid_request_error",
                code: "invalid_parameter"
            }
        }
    },
    n: {
        reverse: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            choices: [
                {
                    index: 0,
                    message: {
                        role: "assistant",
                        content: "not reverse 1"
                    }
                },
                {
                    index: 1,
                    message: {
                        role: "assistant",
                        content: "not reverse 2"
                    }
                }
            ],
            system_fingerprint: "fp_44709"
        },
        official: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            model: "gpt-3.5-turbo-0613",
            choices: [
                {
                    index: 0,
                    message: {
                        role: "assistant",
                        content: "not reverse 1"
                    },
                    finish_reason: "stop"
                },
                {
                    index: 1,
                    message: {
                        role: "assistant",
                        content: "not reverse 2"
                    },
                    finish_reason: "stop"
                }
            ],
            usage: {
                prompt_tokens: 9,
                completion_tokens: 24,
                total_tokens: 33
            }
        }
    },
    stop: {
        reverse: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            choices: [{
                index: 0,
                message: {
                    role: "assistant",
                    content: "not reverse not"
                }
            }],
            system_fingerprint: "fp_44709"
        },
        official: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            model: "gpt-3.5-turbo-0613",
            choices: [{
                index: 0,
                message: {
                    role: "assistant",
                        content: "not reverse not"
                },
                finish_reason: "stop"
            }],
            usage: {
                prompt_tokens: 9,
                completion_tokens: 6,
                total_tokens: 15
            }
        }
    }
};

let fullResponseData = null;

// 更新示例显示
function updateExamples(testType) {
    const reverseExample = document.getElementById('reverseExample');
    const officialExample = document.getElementById('officialExample');
    
    reverseExample.textContent = JSON.stringify(examples[testType].reverse, null, 2);
    officialExample.textContent = JSON.stringify(examples[testType].official, null, 2);
}

// 监听测试方法选择变化
document.getElementById('testType').addEventListener('change', (e) => {
    updateExamples(e.target.value);
});

// 页面加载时显示默认示例
updateExamples('max_tokens');

// 处理表单提交
document.getElementById('apiForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const baseUrl = document.getElementById('baseUrl').value;
    const apiKey = document.getElementById('apiKey').value;
    const model = document.getElementById('model').value;
    const testType = document.getElementById('testType').value;
    
    try {
        const response = await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                baseUrl,
                apiKey,
                model,
                testType
            })
        });
        
        fullResponseData = await response.json();
        
        // 显示响应
        const responseElement = document.getElementById('response');
        responseElement.textContent = JSON.stringify(fullResponseData, null, 2);
        
        // 显示切换按钮
        document.getElementById('toggleFullResponse').classList.remove('hidden');
        document.getElementById('toggleMessageResponse').classList.remove('hidden');
    } catch (error) {
        document.getElementById('response').textContent = `Error: ${error.message}`;
    }
});

// 切换完整响应和消息内容
document.getElementById('toggleFullResponse').addEventListener('click', () => {
    if (!fullResponseData) return;
    document.getElementById('response').textContent = JSON.stringify(fullResponseData, null, 2);
});

document.getElementById('toggleMessageResponse').addEventListener('click', () => {
    if (!fullResponseData || !fullResponseData.choices) return;
    const messages = fullResponseData.choices.map(choice => choice.message);
    document.getElementById('response').textContent = JSON.stringify(messages, null, 2);
}); 