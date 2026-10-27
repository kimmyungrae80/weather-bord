-- Supabase SQL Editor에서 실행할 스크립트

-- 1. ENUM 타입 생성
CREATE TYPE region_type AS ENUM ('세종', '대전', '태안', '보령');
CREATE TYPE kind_type AS ENUM ('야외', '고소', '실내');

-- 2. wx_tasks 테이블 생성
CREATE TABLE wx_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  region region_type NOT NULL,
  kind kind_type NOT NULL,
  owner TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RLS 정책 (인증 없이 읽기/쓰기 가능 - 교육용)
ALTER TABLE wx_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON wx_tasks
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON wx_tasks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON wx_tasks
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON wx_tasks
  FOR DELETE USING (true);

-- 4. 초기 데이터 (가상)
INSERT INTO wx_tasks (title, region, kind, owner) VALUES
  ('다중이용시설 안전점검', '세종', '야외', '김안전'),
  ('시민 안전체험 행사 운영', '보령', '야외', '이행사'),
  ('옥상 태양광 설비 점검', '태안', '고소', '박설비'),
  ('하천 수위계 확인', '대전', '야외', '최현장'),
  ('청사 외벽 간판 보수', '세종', '고소', '정시설'),
  ('비상연락 훈련', '대전', '실내', '한상황');
