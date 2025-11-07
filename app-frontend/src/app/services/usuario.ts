import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../core/app-config.service'; // 👈 importa tu servicio de configuración

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private cfg: AppConfigService // 👈 inyecta AppConfigService
  ) {}

  // Obtenemos la URL del backend directamente desde config.json
  private get apiUrl(): string {
    return `${this.cfg.apiUrl}/usuarios`;
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addUsuario(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
