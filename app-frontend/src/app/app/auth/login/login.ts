import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {

  onSubmit(e: Event) {
    e.preventDefault();

    const btn = document.querySelector('.btn-login') as HTMLButtonElement;
    const originalText = btn?.textContent ?? 'Iniciar Sesión';

    if (btn) {
      btn.textContent = 'Iniciando sesión...';
      btn.style.background = '#2d7a2e';
    }

    setTimeout(() => {
      localStorage.setItem('eco_token', 'demo-token');
      if (btn) {
        btn.textContent = originalText;
        btn.style.background = '#1a1a1a';
      }
      alert('¡Bienvenido a EcoRecolecta! 🌱\n\nLogin exitoso (solo frontend)');
    }, 1500);
  }
}
