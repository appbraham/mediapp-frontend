import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Medico } from '../_model/medico';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  private url: string = `${environment.HOST}/medicos`;

  private http = inject(HttpClient);

  constructor() { }

  listar(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.url);
  }

  listarPorId(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.url}/${id}`);
  }

  registrar(Medico: Medico) {
    return this.http.post(this.url, Medico);
  }

  modificar(Medico: Medico) {
    return this.http.put(this.url, Medico);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
