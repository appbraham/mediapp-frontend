import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngMaterialModule } from '../../../ang-material/ang-material.module';
import { Especialidad } from '../../../_model/especialidad';
import { EspecialidadService } from '../../../_service/especialidad.service';
import { ActivatedRoute, Params, Router, RouterLink, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidad-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule, FormsModule, RouterLink, AngMaterialModule],
  templateUrl: './especialidad-edicion.component.html',
  styleUrl: './especialidad-edicion.component.css'
})
export class EspecialidadEdicionComponent implements OnInit {

  id!: number;
  especialidad!: Especialidad;
  form!: FormGroup;
  edicion: boolean = false;

  especialidadService = inject(EspecialidadService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit() {

    this.especialidad = new Especialidad();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.especialidadService.listarPorId(this.id).subscribe(data => {
        let id = data.idEspecialidad;
        let nombre = data.nombre;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre)
        });
      });
    }
  }

  operar() {
    this.especialidad.idEspecialidad = this.form.value['id'];
    this.especialidad.nombre = this.form.value['nombre'];

    if (this.especialidad != null && this.especialidad.idEspecialidad > 0) {
      //BUENA PRACTICA
      this.especialidadService.modificar(this.especialidad).pipe(switchMap(() => {
        return this.especialidadService.listar();
      })).subscribe(data => {
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next("SE MODIFICÓ");
      });

    } else {
      //PRACTICA COMUN
      this.especialidadService.registrar(this.especialidad).subscribe(data => {
        this.especialidadService.listar().subscribe(especialidad => {
          this.especialidadService.especialidadCambio.next(especialidad);
          this.especialidadService.mensajeCambio.next("SE REGISTRÓ");
        });
      });
    }

    this.router.navigate(['especialidad']);
  }

}
