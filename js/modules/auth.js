// js/modules/auth.js
import { SUPABASE_URL, SUPABASE_ANON_KEY, saveSession, clearSession } from
    './supabase.js';
const baseHeaders = {
    "Content-Type": "application/json", "apikey":
        5
SUPABASE_ANON_KEY
};
export async function signup(email, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST', headers: baseHeaders,
        body: JSON.stringify({ email, password })
    });
    return res.json();
}
export async function login(email, password) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?
grant_type=password`, {
        method: 'POST', headers: baseHeaders,
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data?.access_token) saveSession(data);
    return data;
}
export function logout() {
    clearSession();
}