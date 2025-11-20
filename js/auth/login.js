// js/auth/login.js
import { SUPABASE_URL, SUPABASE_ANON_KEY, saveSession, getSession } from '../modules/supabase.js'; // CAMINHO CORRIGIDO

const form = document.getElementById('login-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.error_description || data?.error || "Erro ao efetuar login");
        return;
      }
      saveSession(data);
      window.location.href = 'dashboard.html';
    } catch (err) {
      console.error(err);
      alert('Erro de rede ao tentar logar.');
    }
  });
}