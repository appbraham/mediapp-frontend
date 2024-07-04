import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AngMaterialModule } from '../../ang-material/ang-material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Examen } from '../../_model/examen';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamenService } from '../../_service/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-examen',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AngMaterialModule],
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css'
})
export class ExamenComponent implements OnInit{

  examenService = inject(ExamenService);
  snackBar = inject(MatSnackBar);

  displayedColumns = ['id', 'nombre', 'descripcion', 'acciones'];

  dataSource!: MatTableDataSource<Examen>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() {}

  ngOnInit() {
    this.examenService.examenCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examenService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.examenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(examen: Examen) {
    this.examenService.eliminar(examen.idExamen).pipe(switchMap(() => {
      return this.examenService.listar();
    })).subscribe(data => {
      this.examenService.examenCambio.next(data);
      this.examenService.mensajeCambio.next('Se eliminó');
    });

  }

}
