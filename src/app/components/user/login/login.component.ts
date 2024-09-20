import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../../../store/user/user.action'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectError } from '../../../store/user/user.selector';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!:string;
  password!: string;
  error = this.store.select(selectError) 

  constructor(private store: Store ) {}
  onSubmitting() {
    console.log('working from class', this.email,this.password);
    this.store.dispatch(userActions.userLogin({ email: this.email,password: this.password }))
  }
}
