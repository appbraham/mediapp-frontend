import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AngMaterialModule } from '../../ang-material/ang-material.module';
import { MedicoService } from '../../_service/medico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from '../../_model/medico';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AngMaterialModule],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent implements OnInit{

  private medicoService = inject(MedicoService);
  private snackBar = inject(MatSnackBar);
  private matDialog = inject(MatDialog);

  displayedColumns: string[] = ['idMedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource!: MatTableDataSource<Medico>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {

    this.medicoService.medicoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.medicoService.mensajeCambio.subscribe(data => {
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

  abrirDialogo(medico?:Medico){

    let med = medico != null ? medico : new Medico();

    this.matDialog.open(MedicoDialogoComponent, {
      width: '340px',
      data: med,
    }
    );
  }

  eliminar(medico: Medico) {
    this.medicoService.eliminar(medico.idMedico).pipe(switchMap(() => {
      return this.medicoService.listar();
    })).subscribe(data => {
      this.medicoService.medicoCambio.next(data);
      this.medicoService.mensajeCambio.next('SE ELIMINÓ')
    });
  }

}
