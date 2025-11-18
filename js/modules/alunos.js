// js/modules/alunos.js
import { SUPABASE_URL, defaultHeaders, getSession } from './supabase.js';
export async function fetchStudents(query = '') {

    const url = `${SUPABASE_URL}/rest/v1/students?select=*,course_id(*)${query}
`;
    const res = await fetch(url, { headers: defaultHeaders(true) });
    if (!res.ok) throw new Error('Falha ao buscar alunos');
    return res.json();
}
export async function createStudent(student) {
    const sess = getSession();
    if (sess?.user?.id) student.created_by = sess.user.id;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/students`, {
        method: 'POST',
        headers: defaultHeaders(true),
        body: JSON.stringify(student)
    });
    if (!res.ok) throw new Error('Falha ao criar aluno');
    return res.json();
}
export async function updateStudent(id, student) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${id}`, {
        method: 'PATCH',
        headers: defaultHeaders(true),
        body: JSON.stringify(student)
    });
    if (!res.ok) throw new Error('Falha ao atualizar aluno');
    return res.json();
}
7
export async function deleteStudent(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${id}`, {
        method: 'DELETE',
        headers: defaultHeaders(true)
    });
    return res.ok;
}