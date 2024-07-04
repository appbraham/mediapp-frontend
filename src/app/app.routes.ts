import { Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';

export const routes: Routes = [
  {
    path: 'paciente',
    component: PacienteComponent,
    children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children:[
      {path: 'nuevo', component: EspecialidadEdicionComponent},
      {path: 'edicion/:id', component: EspecialidadEdicionComponent},
    ]
  },
  {
    path: 'examen', component: ExamenComponent, children:[
      {path: 'nuevo', component: ExamenEdicionComponent},
      {path: 'edicion/:id', component: ExamenEdicionComponent},
    ]
  },
  {
    path: 'medico',
    component: MedicoComponent
  },
];
