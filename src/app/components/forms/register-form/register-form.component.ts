import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { UsersService } from 'src/app/services/features/users';
import { MustMatch } from './MustMatch';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
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

  error: any;
  constructor(
    public _userService: UsersService,
    private _globals: GlobalsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  async register() {
    if (this.registerForm.errors || !this.registerForm.valid) return;
    this._globals.spinner.show();
    const res: any = await this._userService.register(this.registerForm.value);
    this._globals.spinner.hide();

    if (res.error) {
      this.error = res.error;
      this.toastr.error(this.error, 'Registeration not Successfully');
    }

    if (res == 'register') {
      this.toastr.success(
        'You have been registed successfully.',
        'Registration Successfully'
      );
      this._globals.router.navigate(['/accounts/login']);
    }
  }

  async socialRegister(provider: string) {
    this._globals.spinner.show();

    const resp: any = await this._userService.socialregister(
      provider == 'google' ? 'GoogleAuthProvider' : 'FacebookAuthProvider'
    );
    if (resp.error) {
      this.error = resp.error;
      this._globals.spinner.hide();
    }

    if (!resp.error) {
      const res: any = await this._userService.login(resp, provider);
      if (res.error) this.error = res.error;
      if (res == 'logged in')
        this._globals.router.navigate(['/accounts/overview']);
      this.toastr.success(
        'You have been registed successfully.',
        'Registeration Successfully'
      );
      this._globals.spinner.hide();
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get rpassword() {
    return this.registerForm.get('rpassword');
  }
}
