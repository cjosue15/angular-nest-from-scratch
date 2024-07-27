import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styles: ``,
})
export default class LogInComponent {
  private _authService = inject(AuthService);

  private _formBuilder = inject(FormBuilder);

  private _router = inject(Router);

  form = this._formBuilder.group<LoginForm>({
    email: this._formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    this._authService.logIn(email, password).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/dashboard');
      },
      error: (error) => console.log(error),
    });
  }
}
