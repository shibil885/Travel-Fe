// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoadingService {
//   private _loadingSubject = new BehaviorSubject<boolean>(false);
//   loading$ = this._loadingSubject.asObservable();

//   showLoading() {
//     this._loadingSubject.next(true);
//   }

//   hideLoading() {
//     this._loadingSubject.next(false);
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$: Observable<boolean> = this._loading.asObservable();

  showLoading() {
    this._loading.next(true);
  }

  hideLoading() {
    this._loading.next(false);
  }
}
