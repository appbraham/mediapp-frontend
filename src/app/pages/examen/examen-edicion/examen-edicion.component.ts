import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngMaterialModule } from '../../../ang-material/ang-material.module';
import { Examen } from '../../../_model/examen';
import { ExamenService } from '../../../_service/examen.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-examen-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AngMaterialModule],
  templateUrl: './examen-edicion.component.html',
  styleUrl: './examen-edicion.component.css'
})
export class ExamenEdicionComponent {

  private examenService = inject(ExamenService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  id!: number;
  examen!: Examen;
  form!: FormGroup;
  edicion: boolean = false;


  constructor() { }

  ngOnInit() {

    this.examen = new Examen();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl(''),
    });


    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.edicion = params['id'] != null;
      this.initForm();
    });


  }

  initForm() {
    if (this.edicion) {
      this.examenService.listarPorId(this.id).subscribe(data => {
        let id = data.idExamen;
        let nombre = data.nombre;
        let descripcion = data.descripcion

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'descripcion': new FormControl(descripcion)
        });
      });
    }
  }

  operar() {
    this.examen.idExamen = this.form.value['id'];
    this.examen.nombre = this.form.value['nombre'];
    this.examen.descripcion = this.form.value['descripcion'];

    if (this.examen != null && this.examen.idExamen > 0) {

      //BUENA PRACTICA
      this.examenService.modificar(this.examen).pipe(switchMap(() => {
        return this.examenService.listar();
      })).subscribe(data => {
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next("Se modifico");
      });
    } else {

      //PRACTICA COMUN
      this.examenService.registrar(this.examen).subscribe(data => {
        this.examenService.listar().subscribe(especialidad => {
          this.examenService.examenCambio.next(especialidad);
          this.examenService.mensajeCambio.next("Se registro");
        });
      });
    }

    this.router.navigate(['examen']);
  }

}
