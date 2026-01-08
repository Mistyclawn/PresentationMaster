# PPTXManager - PresentationMaster

<div align="center">

**전문적인 프레젠테이션 제작을 위한 올인원 솔루션**

프레젠테이션 디자인, 스크립트 작성, 발표 연습까지 한 곳에서

</div>

---

## 📋 프로젝트 소개

**PPTXManager**는 단순한 슬라이드 편집을 넘어서, 발표의 기획부터 디자인, 스크립트 작성, 연습까지 전체 프레젠테이션 라이프사이클을 지원하는 통합 도구입니다.

### 🎯 프로젝트 비전

- **발표 설계 지원**: 슬라이드와 스크립트를 함께 관리하며 체계적인 발표 준비
- **디자인 일관성**: AI 기반 디자인 분석으로 전문적이고 통일된 프레젠테이션 제작
- **오프라인 우선**: Electron 기반 데스크톱 앱으로 인터넷 없이 모든 기능 사용 (Offline-first)
- **효율적인 워크플로우**: React 18 + Vite의 빠른 성능과 MS PowerPoint의 친숙함 결합

---

## ✨ 주요 기능

### 1. 📝 슬라이드 편집 (Editor)
- **EditorLayout.tsx**: MS PowerPoint 스타일의 직관적인 편집 인터페이스
- **Workspace**: 직관적인 그래픽 요소 편집 (ShapeElement: Rect, Circle, Text, Image)
- **실시간 렌더링**: 변경 사항 즉시 반영

### 2. 🎯 Presentation Master (Dashboard)
발표 준비를 위한 통합 대시보드 (`Dashboard.tsx`)

- **내러티브 플로우**: 슬라이드별 제목, 설명, 스크립트 통합 관리
- **타임라인 관리**: 슬라이드별 소요 시간 설정 및 전체 리허설 시간 계산
- **컴팩트 뷰**: 대량의 슬라이드를 효율적으로 관리하는 요약 보기
- **직관적 제어**: 드래그 앤 드롭으로 순서 재배치

### 3. 🎨 디자인 시스템 (Design Consistency)
- **Design Template**: 프로젝트 레벨의 테마, 색상, 폰트 관리 (`variables.css` 기반)
- **SlideDesignModal**: 개별/일괄 디자인 적용 및 분석
- **자동 검사**: 폰트, 색상, 레이아웃의 디자인 템플릿 준수 여부 확인

---

## 🏗 아키텍처 (Architecture Essentials)

이 프로젝트는 **React 18**, **TypeScript**, **Vite**, **Electron**을 기반으로 구축되었습니다.

### 1. 컴포넌트 구조 (Component Hierarchy)
앱은 명확한 3계층 구조를 따릅니다:

1.  **App.tsx (Root)**:
    *   전역 프로젝트 상태 관리 (Project State)
    *   화면 전환 라우팅 (InitialScreen ↔ Editor ↔ Dashboard)
2.  **메인 컨테이너**:
    *   `EditorLayout.tsx`: 슬라이드 편집 및 저작 도구
    *   `Dashboard.tsx`: 프레젠테이션 기획 및 내러티브 관리
3.  **기능별 컴포넌트**:
    *   `Header`, `Sidebar`, `Workspace` (Editor 전용)
    *   `SlideDesignModal` (디자인 분석 및 적용)

### 2. 데이터 모델 (Data Model)
핵심 데이터는 개별 컴포넌트가 아닌 **App 레벨**에서 관리됩니다 (State Lifting):

- **`slides[]`**: 슬라이드 객체 배열 (id, title, script, duration, elements[])
- **`elements[]`**: 각 슬라이드 내의 도형 요소 (ShapeElement - x, y, style)
- **`designTemplate`**: 전체 테마 색상, 폰트, 레이아웃 규칙
- **`project`**: 프로젝트 메타데이터 (이름, 생성일, 테마 정보)

**데이터 흐름 원칙**: Props down, Callbacks up.

### 3. IPC 통신 (Electron ↔ React)
파일 저장 및 시스템 작업은 `preload.js`를 통한 IPC 통신으로 처리합니다.
- React 컴포넌트는 절대 직접 파일 시스템(`fs`)에 접근하지 않습니다.
- **Save**: `window.ipc.send('save-pptx', { slides, metadata })`
- **Load**: `window.ipc.on('file-loaded', handler)`

---

## 💻 개발 가이드 (Development Workflow)

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드 실행 (Vite HMR + Electron)
npm run dev:electron

# 프로덕션 빌드
npm run build && npm run build:electron
```

> **Note**: `dev:electron` 명령어는 Vite 개발 서버를 로컬 포트에 띄우고, Electron 메인 프로세스가 이를 로드하는 방식으로 작동합니다.

### 스타일링 가이드
- **CSS Variables**: `styles/variables.css`에 정의된 색상(`--primary-color`)과 폰트만 사용합니다.
- **Global Constraints**: 하드코딩된 색상 사용을 지양하고 디자인 시스템을 준수합니다.

---

## 📂 폴더 구조 (Key Files)

```
PPTXManager/
├── Frontend/
│   ├── electron/               # Electron 메인 프로세스 (IPC 핸들러)
│   │   ├── main.js
│   │   └── preload.js
│   ├── src/                    # React 소스 코드
│   │   ├── App.tsx            # [Core] 루트 상태 및 뷰 관리
│   │   ├── components/
│   │   │   ├── Dashboard/     # [Presentation Master] 대시보드 및 디자인 모달
│   │   │   ├── Editor/        # [Editor] 편집 화면 (Layout, Workspace)
│   │   │   └── InitialScreen/ # 시작 화면
│   │   ├── styles/            # 전역 스타일 (variables.css)
│   │   └── main.tsx
│   └── vite.config.ts         # Vite 설정
└── README.md
```

---

## 🗺 개발 로드맵

### ✅ 기본 구현 (Baseline)
- [x] Electron + Vite + React 환경 구축
- [x] Editor & Dashboard 뷰 전환 아키텍처
- [x] IPC 기반 파일 통신 구조 설계

### 🚧 진행 중 (In Progress)
- [ ] 슬라이드 데이터 모델(App.tsx)로 상태 리팩토링
- [ ] ShapeElement 편집을 위한 Workspace 구현
- [ ] PPTX 파일 I/O 로직 (Electron main.js)

### 📅 향후 계획 (Future)
- [ ] AI 기반 디자인 분석 및 브릿지 슬라이드 제안
- [ ] 협업 도구 및 클라우드 연동








