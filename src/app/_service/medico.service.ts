import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Medico } from '../_model/medico';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico>{

  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  // url: string = `${environment.HOST}/medicos`;
  // http = inject(HttpClient);

  constructor(http: HttpClient) {
    super(http, `${environment.HOST}/medicos`);
   }

  // listar(): Observable<Medico[]> {
  //   return this.http.get<Medico[]>(this.url);
  // }

  // listarPorId(id: number): Observable<Medico> {
  //   return this.http.get<Medico>(`${this.url}/${id}`);
  // }

  // registrar(Medico: Medico) {
  //   return this.http.post(this.url, Medico);
  // }

  // modificar(Medico: Medico) {
  //   return this.http.put(this.url, Medico);
  // }

  // eliminar(id: number) {
  //   return this.http.delete(`${this.url}/${id}`);
  // }

}
