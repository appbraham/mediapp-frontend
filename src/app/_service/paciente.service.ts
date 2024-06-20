import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Paciente } from '../_model/paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url: string = `${environment.HOST}/pacientes`;

  private http = inject(HttpClient);

  constructor() { }

  listar():Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(id : number): Observable<Paciente>{
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  registrar(paciente: Paciente){
    return this.http.post(this.url, paciente);
  }

  modificar(paciente: Paciente){
    return this.http.put(this.url, paciente);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
