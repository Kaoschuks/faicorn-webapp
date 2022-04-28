import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.css'],
})
export class ForgotFormComponent implements OnInit {
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])
    ),
  });

  error: string = '';
  constructor(
    public _userService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  async OnSubmit() {
    if (!this.forgotForm.valid || this.forgotForm.errors) return;
    const resp: any = await this._userService.recoverPassword(
      this.forgotForm.value
    );
    this.toastr.success(
      'Reset Link has been sent to your email.',
      'Reset Link Posted!'
    );
  }

  get email() {
    return this.forgotForm.get('email');
  }
}
