// js/modules/supabase.js

export const SUPABASE_URL = "https://hxontajqeaqjnpeorzcx.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4b250YWpxZWFxam5wZW9yemN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTYzNjEsImV4cCI6MjA3OTMzMjM2MX0.cd87fI7JNkhkiBSfUrQNbiMa-52e934zdKksCzZe2w4";
export function defaultHeaders(withAuth = false) {
    const h = {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY
    };
    if (withAuth) {
        const s = getSession();
        if (s?.access_token) h["Authorization"] = `Bearer ${s.access_token}`;
    }
    return h;
}
// util de sessão simples (localStorage)
export function saveSession(sessionObj) {
    localStorage.setItem('sb_session',
        JSON.stringify(sessionObj));
}
export function getSession() {
    const s = localStorage.getItem('sb_session');
    return s ? JSON.parse(s) : null;
}
export function clearSession() { localStorage.removeItem('sb_session'); }
