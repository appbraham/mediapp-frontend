import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterOutlet, RouterLink } from '@angular/router';

import { Paciente } from '../../_model/paciente';
import { PacienteService } from '../../_service/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatSortModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit {

  private pacienteService = inject(PacienteService);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'dni', 'acciones'];
  dataSource!: MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.pacienteService.pacienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.pacienteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

  }


  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(idPaciente: number){
    this.pacienteService.eliminar(idPaciente).pipe( switchMap( () => {
      return this.pacienteService.listar();
    })).subscribe( data => {
      this.pacienteService.pacienteCambio.next(data);
      this.pacienteService.mensajeCambio.next('SE ELIMINÓ')
    });
  }




}
