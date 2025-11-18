// js/ui/main.js
import { signup, login, logout } from '../modules/auth.js';
import { fetchCourses } from '../modules/cursos.js';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from
'../modules/alunos.js';
import { getSession } from '../modules/supabase.js';


document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
loginForm.addEventListener('submit', async (e) => {
e.preventDefault();
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
try {
const res = await login(email, password);
if (res?.error) return alert('Erro: ' + (res.error.message ||
JSON.stringify(res.error)));
if (res?.access_token) {
// redireciona para dashboard
window.location.href = 'dashboard.html';
} else alert('Não foi possível logar.');
} catch (err) { console.error(err); alert('Erro no login'); }
});
}
// Página de registro
const registerForm = document.getElementById('register-form');
if (registerForm) {
registerForm.addEventListener('submit', async (e) => {
e.preventDefault();
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
try {
const res = await signup(email, password);
if (res?.error) return alert('Erro: ' + (res.error.message ||
JSON.stringify(res.error)));
alert('Cadastro realizado. Faça login.');
window.location.href = 'index.html';
} catch (err) { console.error(err); alert('Erro no cadastro'); }
});
}
// Dashboard
const logoutBtn = document.getElementById('logout');
if (logoutBtn) logoutBtn.addEventListener('click', () => { logout();
window.location.href = 'index.html'; });
const studentForm = document.getElementById('student-form');
if (studentForm) initDashboard();
async function initDashboard() {
await populateCourses();
await loadStudents();
studentForm.addEventListener('submit', async (e) => {
e.preventDefault();
const payload = {
name: document.getElementById('student-name').value.trim(),
matricula: document.getElementById('student-matricula').value.trim(),
email: document.getElementById('student-email').value.trim() || null,
course_id: document.getElementById('student-course').value ?
Number(document.getElementById('student-course').value) : null
};
try {
await createStudent(payload);
studentForm.reset();
await loadStudents();
} catch (err) { console.error(err); alert('Erro ao salvar aluno'); }
});
}
async function populateCourses() {
try {
const courses = await fetchCourses();
const sel = document.getElementById('student-course');
if (!sel) return;
sel.innerHTML = '<option value="">Selecione o curso</option>';
courses.forEach(c => {
const opt = document.createElement('option'); opt.value = c.id;
opt.textContent = c.name; sel.appendChild(opt);
});
} catch (err) { console.error(err); }
}
async function loadStudents() {
try {
const data = await fetchStudents();
const tbody = document.getElementById('students-table');
if (!tbody) return;
tbody.innerHTML = '';
if (!data?.length) { tbody.innerHTML = '<tr><td colspan="4"
class="p-4">Nenhum aluno cadastrado.</td></tr>'; return; }
data.forEach(s => {
const tr = document.createElement('tr');
tr.innerHTML = `
 <td class="py-2">${escapeHtml(s.name)}</td>
 <td class="py-2">${escapeHtml(s.matricula)}</td>
 <td class="py-2">${escapeHtml(s.email||'')}</td>
 <td class="py-2">${escapeHtml(s.course_id?.name || '')}</td>
 `;
tbody.appendChild(tr);
});
} catch (err) { console.error(err); }
}
function escapeHtml(text) {
if (!text) return '';
return
text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&qu}
});