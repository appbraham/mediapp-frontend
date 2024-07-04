import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medico } from '../../../_model/medico';
import { AngMaterialModule } from '../../../ang-material/ang-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../../_service/medico.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medico-dialogo',
  standalone: true,
  imports: [CommonModule, FormsModule, AngMaterialModule],
  templateUrl: './medico-dialogo.component.html',
  styleUrl: './medico-dialogo.component.css'
})
export class MedicoDialogoComponent implements OnInit {

  medico!: Medico;

  // constructor(
  //   @Inject(MAT_DIALOG_DATA) private data: Medico,
  //   private dialogRef: MatDialogRef<MedicoDialogoComponent>
  // ){}

  private readonly data = inject<Medico>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<MedicoDialogoComponent>);
  private medicoService = inject(MedicoService);

  ngOnInit(): void {
    this.medico = {...this.data};
    // this.medico = new Medico();
    // this.medico.idMedico = this.data.idMedico;
    // this.medico.nombres = this.data.nombres;
    // this.medico.apellidos = this.data.apellidos;
    // this.medico.cmp = this.data.cmp;
    // this.medico.fotoUrl = this.data.fotoUrl;

  }

  operar() {
    if (this.medico != null) {
      //Modificar
      this.medicoService.modificar(this.medico).pipe( switchMap( () => {
        //SwitchMap obliga el retorno de otro observable.
        return this.medicoService.listar();
      })).subscribe( data => {
        this.medicoService.medicoCambio.next(data);
        this.medicoService.mensajeCambio.next('SE MODIFICÓ');

        this.ref.close();
      });
    }else {
      //Registrar
      this.medicoService.registrar(this.medico).pipe( switchMap( () => {
        //SwitchMap obliga el retorno de otro observable.
        return this.medicoService.listar();
      })).subscribe( data => {
        this.medicoService.medicoCambio.next(data);
        this.medicoService.mensajeCambio.next('SE REGISTRÓ');

        this.ref.close();
      });
    }
  }

  cancelar() {
    this.ref.close();
  }

}
