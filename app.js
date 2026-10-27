// app.js – 화면 동작 (Supabase wx_tasks에서 목록 읽기 · 추가)

let tasks = [];
let weatherByRegion = {};   // 03 단원에서 지역별 날씨를 넣음

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function weatherText(w) {
  return w ? w.tempMax + '℃ · ' + w.windMax + 'm/s · ' + w.rainProb + '%' : '-';
}

function renderTasks() {
  const body = document.getElementById('taskList');
  body.innerHTML = '';
  for (const t of tasks) {
    const w = weatherByRegion[t.region];
    const r = judge(t.kind, w);
    const tr = document.createElement('tr');
    for (const v of [t.title, t.region, t.kind, t.owner, weatherText(w)]) {
      const td = document.createElement('td');
      td.textContent = v;
      tr.appendChild(td);
    }
    const td = document.createElement('td');
    td.textContent = r.text;
    td.className = r.level;
    tr.appendChild(td);
    body.appendChild(tr);
  }
}

async function loadTasks() {
  const { data, error } = await supabase
    .from('wx_tasks')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Supabase 읽기 오류:', error);
    tasks = [];
  } else {
    tasks = data || [];
  }
  renderTasks();
}

async function addTask(e) {
  e.preventDefault();
  const t = {
    title: document.getElementById('titleInput').value.trim(),
    region: document.getElementById('regionInput').value,
    kind: document.getElementById('kindInput').value,
    owner: document.getElementById('ownerInput').value.trim(),
  };

  if (!t.title || !t.owner) return;

  const { error } = await supabase
    .from('wx_tasks')
    .insert([t]);

  if (error) {
    document.getElementById('msgBox').textContent = '저장 실패: ' + error.message;
    return;
  }

  e.target.reset();
  document.getElementById('msgBox').textContent = '';
  await loadTasks();
}

document.getElementById('taskForm').addEventListener('submit', addTask);
loadTasks();
