// js/modules/cursos.js
import { SUPABASE_URL, defaultHeaders } from './supabase.js';
export async function fetchCourses() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/courses?select=*`, {
        headers: defaultHeaders(true)
    });
    if (!res.ok) throw new Error('Falha ao buscar cursos');
    return res.json();
}
export async function createCourse(course) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/courses`, {
        method: 'POST', headers: defaultHeaders(true), body:
            JSON.stringify(course)
    });
    if (!res.ok) throw new Error('Falha ao criar curso');
    return res.json();
}
export async function updateCourse(id, course) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/courses?id=eq.${id}`, {
        method: 'PATCH', headers: defaultHeaders(true), body: // CORRIGIDO (Removido o 6)
            JSON.stringify(course)
    });
    return res.json();
}
export async function deleteCourse(id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/courses?id=eq.${id}`, {
        method: 'DELETE', headers: defaultHeaders(true)
    });
    return res.ok;
}
