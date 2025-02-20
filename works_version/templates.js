const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>逆向与否</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6 text-center">逆向与否</h1>
        <div class="flex gap-6 mb-6">
            <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
                <form id="apiForm" class="space-y-4">
                    <div>
                        <label class="block mb-1">API Base URL:</label>
                        <input type="text" id="baseUrl" class="w-full border p-2 rounded" 
                            placeholder="例如：api.openai.com（无需添加https://或/v1）" required>
                    </div>
                    <div>
                        <label class="block mb-1">API Key:</label>
                        <input type="text" id="apiKey" class="w-full border p-2 rounded" required>
                    </div>
                    <div>
                        <label class="block mb-1">Model:</label>
                        <input type="text" id="model" class="w-full border p-2 rounded" value="gpt-4o-2024-11-20" required>
                    </div>
                    <div>
                        <label class="block mb-1">测试方法:</label>
                        <select id="testType" class="w-full border p-2 rounded">
                            <option value="max_tokens">max_tokens参数</option>
                            <option value="logprobs">logprobs参数</option>
                            <option value="n">n参数</option>
                            <option value="stop">stop参数</option>
                        </select>
                    </div>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                        发送请求
                    </button>
                </form>
            </div>
            <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-bold mb-2">响应结果:</h2>
                <pre id="response" class="bg-gray-100 p-4 rounded overflow-auto max-h-[calc(50vh-150px)]"></pre>
                <div class="flex gap-2 mt-2">
                    <button id="toggleFullResponse" class="text-blue-500 hover:text-blue-700 hidden">显示完整响应</button>
                    <button id="toggleMessageResponse" class="text-blue-500 hover:text-blue-700 hidden">仅显示消息内容</button>
                </div>
            </div>
        </div>
        <div class="flex gap-6">
            <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-bold mb-2">逆向接口返回示例:</h2>
                <pre id="reverseExample" class="bg-gray-100 p-4 rounded overflow-auto max-h-[calc(40vh-100px)]"></pre>
            </div>
            <div class="w-1/2 bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-bold mb-2">官方接口返回示例:</h2>
                <pre id="officialExample" class="bg-gray-100 p-4 rounded overflow-auto max-h-[calc(40vh-100px)]"></pre>
            </div>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>
`;

module.exports = { HTML_TEMPLATE }; 