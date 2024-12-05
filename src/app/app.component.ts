import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toaster/toaster.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToastComponent, LoadingComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'travel';
}
