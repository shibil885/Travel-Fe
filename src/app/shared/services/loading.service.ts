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

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoadingService {
//   private _loading = new BehaviorSubject<boolean>(false);
//   public readonly loading$: Observable<boolean> = this._loading.asObservable();

//   showLoading() {
//     this._loading.next(true);
//   }

//   hideLoading() {
//     this._loading.next(false);
//   }
// }

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$: Observable<boolean> = this._loading.asObservable();

  private isServer: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isServer = isPlatformServer(this.platformId);

    if (this.isServer) {
      this._loading.next(true);
    }
  }

  showLoading() {
    this._loading.next(true);
  }

  hideLoading() {
    if (!this.isServer) {
      this._loading.next(false);
    }
  }
}
  