import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/features/users';
import { MustMatch } from '../register-form/MustMatch';

@Component({
  selector: 'reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup(
    {
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      rpassword: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    },
    { validators: MustMatch('password', 'rpassword') }
  );

  error: string = '';
  constructor(public _userService: UsersService) {}

  ngOnInit() {}

  OnSubmit() {}

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get rpassword() {
    return this.resetPasswordForm.get('rpassword');
  }
}
