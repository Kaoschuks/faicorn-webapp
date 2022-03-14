import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {


  registerForm: FormGroup = new FormGroup({
    email: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])
    ),
    password: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
    rpassword: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(6)])
    )
  });
  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      {
        type: "minlength",
        message: "Email must be at least 5 characters long."
      },
      { type: "pattern", message: "Email must be valid." },
      { type: "email", message: "Email must be valid" }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 6 characters long."
      }
    ]
  };

  error: any
  constructor(
    public _userService: UsersService,
    private _globals: GlobalsService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
  }

  async register() {
    this._globals.spinner.show();
    const res: any = await this._userService.register(this.registerForm.value)
    if(res.error) {
      this._globals.spinner.hide();
      this.error = res.error;
      this.toastr.warning(this.error, 'Registeration Successfully')
    }
    if(res == "register") this._globals.router.navigate(['/accounts/login']);
    this.toastr.success('You have been registed successfully.', 'Registeration Successfully')
    this._globals.spinner.hide();
  }

  async socialRegister(provider: string) {
    this._globals.spinner.show();

    const resp: any = await this._userService.socialregister(
      (provider == 'google') ? 'GoogleAuthProvider' : 'FacebookAuthProvider'
    );
    if(resp.error) {
      this.error = resp.error;
      this._globals.spinner.hide();
    } 

    if(!resp.error) {
      const res: any = await this._userService.login(resp, provider);
      if(res.error) this.error = res.error;
      if(res == "logged in") this._globals.router.navigate(['/accounts/overview'])
      this.toastr.success('You have been registed successfully.', 'Registeration Successfully')
      this._globals.spinner.hide();
    }
  }
}
