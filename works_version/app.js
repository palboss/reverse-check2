// 响应处理
let fullResponseData = null;

function displayResponse(data, displayType = 'message') {
    const responseElement = document.getElementById('response');
    const fullButton = document.getElementById('toggleFullResponse');
    const messageButton = document.getElementById('toggleMessageResponse');
    
    if (!data) return;
    
    fullResponseData = data;
    
    if (displayType === 'message' && data.choices && data.choices[0].message) {
        responseElement.textContent = JSON.stringify(data.choices[0].message, null, 2);
        fullButton.classList.remove('hidden');
        messageButton.classList.add('hidden');
    } else {
        responseElement.textContent = JSON.stringify(data, null, 2);
        if (data.choices && data.choices[0].message) {
            messageButton.classList.remove('hidden');
            fullButton.classList.add('hidden');
        } else {
            messageButton.classList.add('hidden');
            fullButton.classList.add('hidden');
        }
    }
}

// 示例展示
function updateExamples(testType) {
    const reverseExample = document.getElementById('reverseExample');
    const officialExample = document.getElementById('officialExample');
    
    reverseExample.textContent = JSON.stringify(EXAMPLES[testType].reverse, null, 2);
    officialExample.textContent = JSON.stringify(EXAMPLES[testType].official, null, 2);
}

// 事件监听器
document.addEventListener('DOMContentLoaded', () => {
    // 初始化示例显示
    updateExamples('max_tokens');
    
    // 测试方法切换
    document.getElementById('testType').addEventListener('change', (e) => {
        updateExamples(e.target.value);
    });
    
    // 响应切换按钮
    document.getElementById('toggleFullResponse').addEventListener('click', () => {
        displayResponse(fullResponseData, 'full');
    });
    
    document.getElementById('toggleMessageResponse').addEventListener('click', () => {
        displayResponse(fullResponseData, 'message');
    });
    
    // 表单提交
    document.getElementById('apiForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            baseUrl: document.getElementById('baseUrl').value,
            apiKey: document.getElementById('apiKey').value,
            model: document.getElementById('model').value,
            testType: document.getElementById('testType').value
        };
        
        document.getElementById('response').textContent = '请求中...';
        
        try {
            const response = await fetch('/api_request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            displayResponse(data);
        } catch (error) {
            document.getElementById('response').textContent = 'Error: ' + error.message;
            document.getElementById('toggleFullResponse').classList.add('hidden');
            document.getElementById('toggleMessageResponse').classList.add('hidden');
        }
    });
}); 