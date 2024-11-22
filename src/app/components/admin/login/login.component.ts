import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as adminActions from '../../../store/admin/admin.action'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  constructor(private _store: Store) {}
  onSubmit() {
    this._store.dispatch(adminActions.adminLogin({email:this.email,password:this.password}))
  }
}
