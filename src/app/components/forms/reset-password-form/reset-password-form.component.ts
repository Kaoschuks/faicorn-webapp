import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/services/core/globals.service';
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
  constructor(
    public _userService: UsersService,
    private _globals: GlobalsService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    await this.checkToken();
  }

  async OnSubmit() {
    if (this.resetPasswordForm.errors && !this.resetPasswordForm.valid) return;
    this._globals.spinner.show();
    const resp: any = await this._userService.changePassword(
      this.resetPasswordForm.value
    );
    this.toastr.success(
      'Your password has been updated successfully.',
      'Account Password Updated!'
    );
  }

  async checkToken() {
    this._globals.spinner.show();
    let token = this._globals.url.split('/')[3];
    const resp: any = await this._userService.confirmToken(token);
    this._globals.spinner.hide();
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get rpassword() {
    return this.resetPasswordForm.get('rpassword');
  }
}
