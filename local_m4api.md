# Ollama API 사용 가이드


## 📋 목차
1. [기본 설정](#기본-설정)
2. [주요 API 엔드포인트](#주요-api-엔드포인트)
3. [Python 사용 예제](#python-사용-예제)
4. [cURL 사용 예제](#curl-사용-예제)
5. [고급 옵션](#고급-옵션)


---


## 🚀 기본 설정


### 서버 실행
```bash
python run_ollama.py
```


### 네트워크 설정
다른 PC에서 접근하려면 서버의 IP 주소를 사용:
```bash
# 서버 실행 시 표시된 IP 주소 확인
# 예: http://192.168.1.100:11434
```


---


## 📡 주요 API 엔드포인트


### 1. `/api/generate` - 텍스트 생성
기본적인 프롬프트 → 응답 생성


**요청:**
```json
{
  "model": "gpt-oss:20b",
  "prompt": "Hello, how are you?",
  "stream": false
}
```


**응답:**
```json
{
  "model": "llama2",
  "created_at": "2025-12-31T12:00:00Z",
  "response": "I'm doing well, thank you!",
  "done": true
}
```


### 2. `/api/chat` - 채팅 대화
대화 형식으로 컨텍스트 유지


**요청:**
```json
{
  "model": "llama2",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is Python?"}
  ],
  "stream": false
}
```


**응답:**
```json
{
  "message": {
    "role": "assistant",
    "content": "Python is a high-level programming language..."
  },
  "done": true
}
```


### 3. `/api/tags` - 모델 목록
설치된 모델 조회


**요청:**
```bash
GET /api/tags
```


**응답:**
```json
{
  "models": [
    {
      "name": "llama2:latest",
      "size": 3826793677,
      "modified_at": "2025-12-31T12:00:00Z"
    }
  ]
}
```


### 4. `/api/pull` - 모델 다운로드
새 모델 다운로드


**요청:**
```json
{
  "name": "llama2"
}
```


### 5. `/api/embeddings` - 텍스트 임베딩
벡터 임베딩 생성


**요청:**
```json
{
  "model": "llama2",
  "prompt": "Hello world"
}
```


**응답:**
```json
{
  "embedding": [0.123, -0.456, 0.789, ...]
}
```


### 6. `/api/show` - 모델 정보
모델 상세 정보 조회


**요청:**
```json
{
  "name": "llama2"
}
```


### 7. `/api/delete` - 모델 삭제
모델 제거


**요청:**
```json
{
  "name": "llama2"
}
```


---


## 🐍 Python 사용 예제


### 설치
```bash
pip install requests numpy
```


### 간단한 사용
```python
from ollama_api_examples import OllamaClient


# 클라이언트 생성
client = OllamaClient("http://192.168.1.100:11434")


# 1. 기본 텍스트 생성
result = client.generate(
    model="llama2",
    prompt="파이썬이란?"
)
print(result['response'])


# 2. 스트리밍 생성
for chunk in client.generate_stream(
    model="llama2",
    prompt="이야기를 써줘"
):
    print(chunk, end='', flush=True)


# 3. 채팅
messages = [
    {"role": "user", "content": "안녕하세요"}
]
result = client.chat(model="llama2", messages=messages)
print(result['message']['content'])


# 4. 대화 이어가기
messages.append({"role": "assistant", "content": result['message']['content']})
messages.append({"role": "user", "content": "날씨 어때?"})
result = client.chat(model="llama2", messages=messages)
```


### 실용적인 예제


#### 📝 번역기
```python
def translate(text, target_lang="Korean"):
    client = OllamaClient("http://192.168.1.100:11434")
    
    prompt = f"Translate the following text to {target_lang}: {text}"
    result = client.generate(model="llama2", prompt=prompt)
    return result['response']


# 사용
print(translate("Hello, how are you?", "Korean"))
```


#### 💻 코드 리뷰어
```python
def code_review(code):
    client = OllamaClient("http://192.168.1.100:11434")
    
    messages = [
        {"role": "system", "content": "You are an expert code reviewer."},
        {"role": "user", "content": f"Review this code:\n\n{code}"}
    ]
    
    result = client.chat(model="codellama", messages=messages)
    return result['message']['content']


# 사용
code = """
def add(a, b):
    return a + b
"""
print(code_review(code))
```


#### 📚 문서 요약기
```python
def summarize(text):
    client = OllamaClient("http://192.168.1.100:11434")
    
    prompt = f"Summarize the following text in 3 sentences:\n\n{text}"
    result = client.generate(model="llama2", prompt=prompt, temperature=0.3)
    return result['response']
```


#### 🤖 챗봇 클래스
```python
class Chatbot:
    def __init__(self, model="llama2", system_prompt=None):
        self.client = OllamaClient("http://192.168.1.100:11434")
        self.model = model
        self.messages = []
        
        if system_prompt:
            self.messages.append({"role": "system", "content": system_prompt})
    
    def chat(self, user_message):
        self.messages.append({"role": "user", "content": user_message})
        
        result = self.client.chat(
            model=self.model,
            messages=self.messages
        )
        
        assistant_message = result['message']['content']
        self.messages.append({"role": "assistant", "content": assistant_message})
        
        return assistant_message
    
    def reset(self):
        self.messages = []


# 사용
bot = Chatbot(system_prompt="You are a friendly assistant.")
print(bot.chat("안녕하세요"))
print(bot.chat("파이썬에 대해 알려줘"))
```


---


## 🌐 cURL 사용 예제


### 1. 기본 텍스트 생성
```bash
curl http://192.168.1.100:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Why is the sky blue?"
}'
```


### 2. 스트리밍
```bash
curl http://192.168.1.100:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Tell me a story",
  "stream": true
}'
```


### 3. 시스템 메시지 포함
```bash
curl http://192.168.1.100:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Write a poem",
  "system": "You are a creative poet."
}'
```


### 4. 채팅
```bash
curl http://192.168.1.100:11434/api/chat -d '{
  "model": "llama2",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}'
```


### 5. 옵션 포함
```bash
curl http://192.168.1.100:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Write a short story",
  "options": {
    "temperature": 0.9,
    "num_predict": 200
  }
}'
```


### 6. 모델 목록
```bash
curl http://192.168.1.100:11434/api/tags
```


### 7. 모델 다운로드
```bash
curl http://192.168.1.100:11434/api/pull -d '{
  "name": "mistral"
}'
```


### 8. 임베딩
```bash
curl http://192.168.1.100:11434/api/embeddings -d '{
  "model": "llama2",
  "prompt": "Hello world"
}'
```


---


## ⚙️ 고급 옵션


### 옵션 파라미터


| 파라미터 | 설명 | 기본값 | 범위 |
|---------|------|--------|------|
| `temperature` | 창의성 조절 (높을수록 창의적) | 0.8 | 0.0 ~ 1.0 |
| `top_p` | Nucleus sampling | 0.9 | 0.0 ~ 1.0 |
| `top_k` | Top-K sampling | 40 | 1 ~ 100 |
| `num_predict` | 최대 생성 토큰 수 | 128 | 1 ~ 2048 |
| `repeat_penalty` | 반복 패널티 | 1.1 | 0.0 ~ 2.0 |
| `stop` | 중단 문자열 | [] | 문자열 배열 |


### 사용 예제
```python
client.generate(
    model="llama2",
    prompt="이야기를 써줘",
    temperature=0.9,      # 창의적
    max_tokens=500,       # 길게
)


client.generate(
    model="codellama",
    prompt="코드를 작성해줘",
    temperature=0.2,      # 정확하게
    max_tokens=200,
)
```


### Temperature 가이드
- **0.0 ~ 0.3**: 정확성 중시 (코드, 번역, 요약)
- **0.4 ~ 0.7**: 균형잡힌 (일반적인 대화)
- **0.8 ~ 1.0**: 창의성 중시 (스토리, 시, 아이디어)


---


## 🔧 실전 활용 예제


### 1. 배치 처리
```python
def batch_process(prompts):
    client = OllamaClient("http://192.168.1.100:11434")
    results = []
    
    for prompt in prompts:
        result = client.generate(model="llama2", prompt=prompt)
        results.append(result['response'])
    
    return results


prompts = [
    "파이썬이란?",
    "자바스크립트란?",
    "Go언어란?"
]
answers = batch_process(prompts)
```


### 2. 파일 처리
```python
def process_file(file_path):
    client = OllamaClient("http://192.168.1.100:11434")
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    prompt = f"다음 내용을 요약해줘:\n\n{content}"
    result = client.generate(model="llama2", prompt=prompt)
    
    return result['response']
```


### 3. 웹 API 서버 (Flask)
```python
from flask import Flask, request, jsonify
from ollama_api_examples import OllamaClient


app = Flask(__name__)
client = OllamaClient("http://localhost:11434")


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    
    result = client.generate(
        model="llama2",
        prompt=user_message
    )
    
    return jsonify({
        'response': result['response']
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```


---


## 📌 자주 사용하는 모델


| 모델 | 용도 | 크기 |
|------|------|------|
| `llama2` | 일반 대화, 텍스트 생성 | ~4GB |
| `mistral` | 빠른 응답, 효율적 | ~4GB |
| `codellama` | 코드 생성, 리뷰 | ~4GB |
| `llama2:13b` | 고품질 응답 | ~7GB |
| `gemma` | Google 모델 | ~2GB |


### 모델 다운로드
```bash
curl http://localhost:11434/api/pull -d '{"name": "llama2"}'
curl http://localhost:11434/api/pull -d '{"name": "mistral"}'
curl http://localhost:11434/api/pull -d '{"name": "codellama"}'
```


---


## 🐛 트러블슈팅


### 연결 오류
```python
# 서버가 실행 중인지 확인
curl http://192.168.1.100:11434/api/tags


# Python에서 연결 확인
try:
    client = OllamaClient("http://192.168.1.100:11434")
    models = client.list_models()
    print(f"연결 성공! 모델 수: {len(models)}")
except Exception as e:
    print(f"연결 실패: {e}")
```


### 타임아웃
```python
import requests


# 타임아웃 설정 (초)
response = requests.post(
    "http://192.168.1.100:11434/api/generate",
    json={"model": "llama2", "prompt": "Hi"},
    timeout=60  # 60초
)
```


### 메모리 부족
모델 크기에 따라 8GB 이상의 RAM 필요
- 작은 모델 사용: `mistral`, `gemma`
- 큰 모델은 GPU 권장


---


## 📚 추가 리소스


- [Ollama 공식 문서](https://ollama.ai/docs)
- [API 레퍼런스](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [모델 라이브러리](https://ollama.ai/library)


---


## 💡 팁


1. **스트리밍 사용**: 긴 응답은 스트리밍으로 실시간 출력
2. **Temperature 조절**: 작업에 맞게 창의성 조절
3. **시스템 메시지**: 역할 지정으로 더 나은 응답
4. **대화 히스토리**: 컨텍스트 유지로 자연스러운 대화
5. **배치 처리**: 여러 요청은 비동기로 처리

