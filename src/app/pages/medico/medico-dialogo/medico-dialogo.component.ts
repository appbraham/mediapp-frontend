import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medico } from '../../../_model/medico';

@Component({
  selector: 'app-medico-dialogo',
  standalone: true,
  imports: [],
  templateUrl: './medico-dialogo.component.html',
  styleUrl: './medico-dialogo.component.css'
})
export class MedicoDialogoComponent implements OnInit{

  medico!: Medico;

  // constructor(@Inject(MAT_DIALOG_DATA) private data: Medico ){}
  private readonly data = inject<Medico>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.medico = this.data;
    console.log(this.medico);

  }

}
