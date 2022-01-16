import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

	separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Japan, CountryISO.China];

  profileForm: FormGroup = this.formBuilder.group({
    fullname: new FormControl('', Validators.compose([
      Validators.required
    ])),
    username: new FormControl('', Validators.compose([
      Validators.required
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required
    ])),
    phone: new FormControl('', Validators.compose([
      Validators.required
    ])),
    address: new FormControl('', Validators.compose([
      Validators.required
    ]))
  })
  constructor(
    public formBuilder: FormBuilder,
    public _userService: UsersService
  ) { }

  async ngOnInit() {
    const resp: any = await this._userService.getUserInfo();
    this.profileForm.patchValue({
      fullname: this._userService.user.fullname,
      username: this._userService.user.username,
      email: this._userService.user.email,
      phone: this._userService.user.phone,
      address: this._userService.user.otherinfo.address,
    })
  }

  async updateProfile() {
  }

}
