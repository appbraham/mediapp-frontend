import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { Paciente } from '../../_model/paciente';
import { PacienteService } from '../../_service/paciente.service';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatSortModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit, AfterViewInit {

  private pacienteService = inject(PacienteService);

  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'dni', 'acciones'];
  dataSource!: MatTableDataSource<Paciente>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;


  ngOnInit(): void {
    this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
  }

  filtrar(e: any) {

  }




}
