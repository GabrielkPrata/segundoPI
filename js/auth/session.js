// js/auth/session.js
import { getSession, clearSession } from '../supabaseClient.js';

const session = getSession();
if (!session || !session.access_token) {
  // redireciona ao login se não autenticado
  location.href = 'index.html';
} else {
  // exibe email do usuário no header
  const emailEl = document.getElementById('user-email');
  if (emailEl) {
    const userEmail = session?.user?.email || session?.email || '';
    emailEl.textContent = userEmail;
  }
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearSession();
      location.href = 'index.html';
    });
  }
}
