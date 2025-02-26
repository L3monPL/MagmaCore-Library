import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MagmaButonModule, MagmaCardModule } from '../../../magma-core/src/public-api';
// import { Card1Component } from 'MagmaCore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MagmaCardModule,
    MagmaButonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MagmaCoreWorkspace';
}
