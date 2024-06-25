import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../_service/paciente.service';
import { Paciente } from '../../../_model/paciente';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-paciente-edicion',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatSnackBarModule],
  templateUrl: './paciente-edicion.component.html',
  styleUrl: './paciente-edicion.component.css'
})
export class PacienteEdicionComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  public form!: FormGroup;
  private route = inject(ActivatedRoute);
  private pacienteService = inject(PacienteService);
  private router = inject(Router);

  id: number = 0;
  edicion: boolean = false;

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [0],
      nombres: [''],
      apellidos: [''],
      dni: [''],
      telefono: [''],
      direccion: [''],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

  }

  initForm() {
    if (this.edicion) {
      this.pacienteService.listarPorId(this.id).subscribe(paciente => {
        this.form = this.fb.group({
          id: [paciente.idPaciente],
          nombres: [paciente.nombres],
          apellidos: [paciente.apellidos],
          dni: [paciente.dni],
          telefono: [paciente.telefono],
          direccion: [paciente.direccion],
        });
      });
    }
  }

  operar(): void {

    let paciente = new Paciente();
    paciente.idPaciente = this.form.value['id'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.telefono = this.form.value['telefono'];
    paciente.direccion = this.form.value['direccion'];

    if(this.edicion){
      //FORMA COMUN
      this.pacienteService.modificar(paciente).subscribe( () => {
        this.pacienteService.listar().subscribe( data => {
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('SE MODIFICÓ');
        })
      })
    }else {
      //FORMA PRACTICA
      this.pacienteService.registrar(paciente).pipe(switchMap( () => {
        return this.pacienteService.listar();
      })).subscribe( data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('SE REGISTRÓ');
      });
    }

    this.router.navigate(['paciente']);

  }

}
