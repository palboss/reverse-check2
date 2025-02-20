const EXAMPLES = {
    max_tokens: {
        reverse: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            choices: [{
                index: 0,
                message: {
                    role: "assistant",
                    content: "not r"
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

module.exports = { EXAMPLES }; 