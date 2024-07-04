import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { EspecialidadService } from '../../_service/especialidad.service';
import { MatTableDataSource } from '@angular/material/table';
import { Especialidad } from '../../_model/especialidad';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { forkJoin, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AngMaterialModule } from '../../ang-material/ang-material.module';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, AngMaterialModule],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent implements OnInit {

  private especialidadService = inject(EspecialidadService);
  public route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['idEspecialidad', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<Especialidad>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.especialidadService.especialidadCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.especialidadService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
      });
    });

    this.especialidadService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });



    // let array = [];
    // for (let i = 0; i < 3; i++) {
    //   let obs = this.especialidadService.listar();
    //   array.push(obs);
    // }

    // forkJoin(array).subscribe(data => {
    //   console.log(data);
    // });

    // let obs1 = this.especialidadService.listar();
    // let obs2 = this.especialidadService.listar();
    // let obs3 = this.especialidadService.listar();

    // //deprecated
    // forkJoin(obs1, obs2, obs3).subscribe(data => {
    //   console.log(data);
    // });

  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idEspecialidad: number) {
    this.especialidadService.eliminar(idEspecialidad).pipe(switchMap(() => {
      return this.especialidadService.listar();
    })).subscribe(data => {
      this.especialidadService.especialidadCambio.next(data);
      this.especialidadService.mensajeCambio.next('SE ELIMINÓ')
    });
  }

}
