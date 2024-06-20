import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, PacienteComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatMenuModule, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mediapp-frontend';
}
