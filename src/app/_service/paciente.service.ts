import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Paciente } from '../_model/paciente';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente>{

  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();

  // private url: string = `${environment.HOST}/pacientes`;
  // private http = inject(HttpClient);

  constructor(http: HttpClient) {
    super(http, `${environment.HOST}/pacientes`);
   }

  // listar():Observable<Paciente[]> {
  //   return this.http.get<Paciente[]>(this.url);
  // }

  // listarPorId(id : number): Observable<Paciente>{
  //   return this.http.get<Paciente>(`${this.url}/${id}`);
  // }

  // registrar(paciente: Paciente){
  //   return this.http.post(this.url, paciente);
  // }

  // modificar(paciente: Paciente){
  //   return this.http.put(this.url, paciente);
  // }

  // eliminar(id: number){
  //   return this.http.delete(`${this.url}/${id}`);
  // }
}
