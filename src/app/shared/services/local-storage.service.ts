import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {
    this._isBrowser = isPlatformBrowser(this._platformId);
  }

  setItem(key: string, value: string): void {
    if (this._isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this._isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this._isBrowser) {
      localStorage.removeItem(key);
    }
  }
}
