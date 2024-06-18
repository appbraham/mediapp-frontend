import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PacienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mediapp-frontend';
}
