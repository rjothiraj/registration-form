import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { RegiserServiceService } from 'src/app/services/regiser-service.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  isVisible = false;

  isValidForm = false;
  registerForm = new FormGroup({
    // id: new FormControl(''),
    nameFormControl: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    phoneFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^\\s*(?:\\+?(\\d{0}))?[-. (]*(\\d{6})[-. )]*(\\d{3})[-. ]*(\\d{1})(?: *x(\\d+))?\\s*$'
      ),
    ]),
    websiteFormControl: new FormControl(''),
    messageFormControl: new FormControl('', [Validators.required]),
  });


  @Input() formData: User[] = []; //  we can access the users data from the viewdata.com
  @Output() onRegister = new EventEmitter();


  constructor(private registerService: RegiserServiceService) {}


  onSubmit(): void{
    if (this.registerForm.valid === !this.isValidForm) {
      var registerForm = this.registerForm.value;
      this.onRegister.emit(registerForm);
      console.log(registerForm);
      this.registerForm.reset();
      this.registerForm.controls["nameFormControl"].setErrors(null);
      this.registerForm.controls["emailFormControl"].setErrors(null);
      this.registerForm.controls["phoneFormControl"].setErrors(null);
      this.registerForm.controls["websiteFormControl"].setErrors(null);
      this.registerForm.controls["messageFormControl"].setErrors(null);

      }
    }
  }



