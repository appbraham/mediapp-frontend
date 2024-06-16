import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Paciente } from '../_model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url: string = environment.HOST;

  private http = inject(HttpClient);

  constructor() { }

  listar(){
    this.http.get<Paciente[]>(`${this.url}/pacientes`);
  }
}
