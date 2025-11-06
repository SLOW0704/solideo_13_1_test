# PMS 빠른 시작 가이드

## 로컬 환경에서 실행하기

### 1단계: 리포지토리 클론
```bash
git clone https://github.com/SLOW0704/solideo_13_1_test.git
cd solideo_13_1_test
git checkout claude/check-repo-connection-011CUrBehBJGcGuDCa1HdrDD
```

### 2단계: 의존성 설치
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3단계: 실행

#### 옵션 A: 한 번에 실행 (추천)
```bash
npm run dev
```

#### 옵션 B: 개별 실행
터미널 1에서:
```bash
cd backend
npm run dev
```

터미널 2에서:
```bash
cd frontend
npm run dev
```

### 4단계: 브라우저 접속
```
http://localhost:3000
```

## 접속 주소

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## 문제 해결

### 포트가 이미 사용 중인 경우

**백엔드 포트 변경:**
`backend/.env` 파일 수정:
```
PORT=3002
```

**프론트엔드 포트 변경:**
`frontend/vite.config.ts` 파일의 server.port 수정

### Node.js 버전 확인
```bash
node --version  # v16 이상이어야 함
```

### 의존성 재설치
```bash
rm -rf node_modules backend/node_modules frontend/node_modules
rm package-lock.json backend/package-lock.json frontend/package-lock.json
npm install
cd backend && npm install
cd ../frontend && npm install
```

## 기본 사용법

### 프로젝트 생성
1. "Projects" 메뉴 클릭
2. "+ New Project" 버튼 클릭
3. 프로젝트 정보 입력 후 저장

### 이슈 생성
1. 프로젝트 카드의 "View Issues" 클릭
2. "+ New Issue" 버튼 클릭
3. 이슈 정보 입력 (제목, 설명, 우선순위, 담당자)
4. 저장

### 마일스톤 생성
1. "Milestones" 메뉴 클릭
2. "+ New Milestone" 버튼 클릭
3. 마일스톤 정보 입력 (제목, 설명, 마감일)
4. 저장

### 일정 생성
1. "Schedules" 메뉴 클릭
2. "+ New Schedule" 버튼 클릭
3. 일정 정보 입력 (제목, 시작일, 종료일)
4. 저장

## 데이터베이스

SQLite 데이터베이스 파일: `backend/data/pms.db`

데이터베이스를 초기화하려면:
```bash
rm backend/data/pms.db
# 서버를 다시 시작하면 자동으로 재생성됨
```

## 개발 정보

### 백엔드 기술 스택
- Node.js + Express
- TypeScript
- SQLite3

### 프론트엔드 기술 스택
- React 18
- TypeScript
- Vite
- React Router
- Axios

### API 엔드포인트

**Projects**
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

**Issues**
- GET /api/issues?project_id=1
- GET /api/issues/:id
- POST /api/issues
- PUT /api/issues/:id
- DELETE /api/issues/:id

**Milestones**
- GET /api/milestones?project_id=1
- GET /api/milestones/:id
- POST /api/milestones
- PUT /api/milestones/:id
- DELETE /api/milestones/:id

**Schedules**
- GET /api/schedules?project_id=1
- GET /api/schedules/:id
- POST /api/schedules
- PUT /api/schedules/:id
- DELETE /api/schedules/:id

## 프로덕션 빌드

### 백엔드 빌드
```bash
cd backend
npm run build
npm start
```

### 프론트엔드 빌드
```bash
cd frontend
npm run build
npm run preview
```

## 지원

문제가 발생하면 GitHub Issues에 등록해주세요:
https://github.com/SLOW0704/solideo_13_1_test/issues
