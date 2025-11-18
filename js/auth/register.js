// js/auth/register.js
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../supabaseClient.js';

const form = document.getElementById('register-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.error_description || data?.error || 'Erro no cadastro');
        return;
      }
      // Opcional: salvar nome em uma tabela profiles (se desejar)
      alert('Cadastro realizado! Verifique seu e-mail (se necessário) e faça login.');
      window.location.href = 'index.html';
    } catch (err) {
      console.error(err);
      alert('Erro de rede ao cadastrar.');
    }
  });
}
