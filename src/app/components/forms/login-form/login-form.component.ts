import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
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

  error: string = ''
  constructor(
    private _userService: UsersService,
    private _globals: GlobalsService
  ) {
  }

  ngOnInit() {
  }

  async login() {
    this._userService.login(this.loginForm.value).then(() => {
      this._globals.spinner.hide();
      this._globals.router.navigate(['/accounts/overview'])
    }).catch((error: any) => {
      this._globals.spinner.hide();
      this.error = error.error
    })
  }

  async socialLogin(provider: string) {
    this._globals.spinner.show();

    const resp: any = await this._userService.socialregister(
      (provider == 'google') ? 'GoogleAuthProvider' : 'FacebookAuthProvider'
    );
    if(resp.error) {
      console.log(resp.error);
      this._globals.spinner.hide();
    } 

    if(!resp.error) {
      const res: any = await this._userService.login(resp, provider);
      if(res.error) console.log(res.error);
      if(res == "logged in") this._globals.router.navigate(['/accounts/overview'])
      this._globals.spinner.hide();
    }

  }

}

