import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { UsersService } from 'src/app/services/features/users';
declare let document: any;

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent implements OnInit {
  // separateDialCode = false;
  // SearchCountryField = SearchCountryField;
  // CountryISO = CountryISO;
  // PhoneNumberFormat = PhoneNumberFormat;
  // preferredCountries: CountryISO[] = [CountryISO.Japan, CountryISO.China];
  filePath: string | undefined;
  profileForm: FormGroup = this.formBuilder.group({
    fullname: new FormControl('', Validators.compose([Validators.required])),
    sex: new FormControl('', Validators.compose([Validators.required])),
    image: new FormControl('', Validators.compose([Validators.required])),
    username: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.compose([Validators.required])),
    address1: new FormControl('', Validators.compose([Validators.required])),
    address1_state: new FormControl(
      '',
      Validators.compose([Validators.required])
    ),
    address1_country: new FormControl(
      '',
      Validators.compose([Validators.required])
    ),
    address2: new FormControl('', Validators.compose([Validators.required])),
    address2_state: new FormControl(
      '',
      Validators.compose([Validators.required])
    ),
    address2_country: new FormControl(
      '',
      Validators.compose([Validators.required])
    ),
  });
  constructor(
    public formBuilder: FormBuilder,
    public _userService: UsersService,
    private _listingsService: ListingsService,
    private toastr: ToastrService,
    private globals: GlobalsService
  ) {}

  async ngOnInit() {
    this.globals.spinner.show();
    await this.processForm();
  }

  async saveProfile(form: any) {
    if (form?.username !== '' || form?.phone !== '' || form?.fullname !== '') {
      let formData: any = form;
      form.uid = this._userService.user.uid;
      form.access = this._userService.user.access;
      form.otherinfo = {
        address1: {
          street: form.address1,
          country: form.address1_country,
          state: form.address1_state,
        },
        address2: {
          street: form.address2,
          country: form.address2_country,
          state: form.address2_state,
        },
      };
      console.log(formData);
      const resp: any = await this._userService.updateUserInfo(formData);
      if (resp == 'user updated') {
        await this.processForm();
        this.toastr.success(
          'User profile Updated Successfully',
          'Profile Update Success!'
        );
      } else this.toastr.error(resp.error, 'Profile Update Failed');
    } else
      this.toastr.error(
        'Please complete the required fields',
        'Profile Update Failed!'
      );
  }

  async processForm() {
    await this._userService.getUserInfo();
    this.profileForm.patchValue({
      fullname: this._userService.user.fullname,
      sex: this._userService.user.sex,
      username: this._userService.user.username,
      image: this._userService.user.image,
      email: this._userService.user.email,
      phone: this._userService.user.phone,
      address1: this._userService.user.otherinfo?.address1?.street,
      address1_state: this._userService.user.otherinfo?.address1?.state,
      address1_country: this._userService.user.otherinfo?.address1?.country,
      address2: this._userService.user.otherinfo?.address2?.street,
      address2_state: this._userService.user.otherinfo?.address2?.state,
      address2_country: this._userService.user.otherinfo?.address2?.country,
    });
    intlTelInput(document.querySelector('#phoneLabel'), {
      nationalMode: true,
      placeholderNumberType: 'MOBILE',
      separateDialCode: true,
      preferredCountries: ['gh', 'ng'],
    });
    this.globals.spinner.hide();
  }

  async onFileChanged(event: any) {
    this.globals.spinner.show();
    const file = event.target.files[0];
    const file_resp: any = await this._listingsService.upload(file);
    this.globals.spinner.hide();

    if (!file_resp.secure_url) alert(file_resp);

    if (file_resp.secure_url)
      this.profileForm.patchValue({
        image: file_resp.secure_url.replace(
          'image/upload/',
          'image/upload/w_auto,f_auto,q_auto/'
        ),
      });
  }

  get username() {
    return this.profileForm.get('username');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get phone() {
    return this.profileForm.get('phone');
  }
}
