# CLAUDE.md – 현장 일정 날씨판 작업 규칙

## 프로젝트 개요
- 교육용 프로토타입이다. 무엇을 만들지는 PRD.md를 따른다.
- PRD.md에 없는 기능은 먼저 제안하고, 내가 승인한 뒤에만 구현한다.

## 기술 스택 (변경 금지)
- HTML + CSS + 순수 JavaScript + Supabase-js(CDN)만 사용한다. (React 등 프레임워크, 빌드 도구 사용 금지)
- index.html 을 더블클릭해서 열 수 있어야 한다. (Supabase 연결 필요)

## 폴더 구조
- index.html : 화면 구조
- style.css  : 디자인
- logic.js   : 판단 규칙만 (화면을 다루는 코드 금지)
- app.js     : 화면 동작 (Supabase wx_tasks에서 목록 읽기 · 추가)
- config.js  : Supabase 연결 정보 (ANON_KEY만, 비밀 키는 금지)
- setup.sql  : Supabase SQL Editor에서 실행 (표 만들기 · 초기 데이터)
- PRD.md · CLAUDE.md · README.md : 문서

## 작업 방식
1. 코드를 고치기 전에 계획(수정할 파일과 이유)을 먼저 보여 주고 승인을 받는다.
2. 한 번에 한 가지만 고친다.
3. 끝나면 바꾼 파일, 내가 확인할 방법(T-번호), 남은 문제를 보고한다.

## 보안 · 데이터 규칙
- 가상 데이터만 Supabase wx_tasks 표에 저장한다. 실제 이름 · 연락처 · 기관 내부 자료를 넣지 않는다.
- 사용자가 입력한 글자는 textContent 로 표시한다.
- Supabase 비밀 키(SERVICE_ROLE_KEY)는 절대 사용하지 마. 공개용 키(ANON_KEY)만 config.js에 둔다.
- config.js는 Git에 커밋해도 된다. (공개 키만 있으므로)
