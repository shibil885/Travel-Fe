import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AgencyService } from '../shared/services/agency.service';
import { map, Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';

export class Existing {
  constructor(
    private _agencyService: AgencyService,
    private _userService: UserService
  ) {}
  isExistingEmailUser(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this._userService.findEmail(control.value).pipe(
      map((data) => {
        return data.isExisting ? { isExistingEmail: true } : null;
      })
    );
  }
  isExistingEmail(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this._agencyService.findEmail(control.value).pipe(
      map((data) => {
        return data.isExisting ? { isExistingEmail: true } : null;
      })
    );
  }
  isExistingName(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this._agencyService.findName(control.value).pipe(
      map((data) => {
        return data.isExisting ? { isExistingEmail: true } : null;
      })
    );
  }
}
