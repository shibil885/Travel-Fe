
// import { Component } from '@angular/core';
// import { LoadingService } from '../../services/loading.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-loading',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './loading.component.html',
//   styleUrls: ['./loading.component.css'],
// })
// export class LoadingComponent {
//   isLoading$ = this._loadingService.loading$;

//   constructor(private _loadingService: LoadingService) {}
// }
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  isLoading$ = this._loadingService.loading$;

  constructor(private _loadingService: LoadingService) {}
}
