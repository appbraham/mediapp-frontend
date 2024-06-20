import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { PacienteService } from '../../../_service/paciente.service';


@Component({
  selector: 'app-paciente-edicion',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './paciente-edicion.component.html',
  styleUrl: './paciente-edicion.component.css'
})
export class PacienteEdicionComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  public form!: FormGroup;
  private route = inject(ActivatedRoute);
  private pacienteService = inject(PacienteService);

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

  operar(): void {
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

}
