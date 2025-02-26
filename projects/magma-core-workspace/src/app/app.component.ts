import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MagmaCardModule } from '../../../magma-core/src/public-api';
// import { Card1Component } from 'MagmaCore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MagmaCardModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MagmaCoreWorkspace';
}
