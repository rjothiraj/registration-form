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
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  isVisible = false;

  isValidForm = false;

    editForm = new FormGroup({
    id: new FormControl(''),
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

  @Input() formData: User[] = [];
  @Output() onUpdate = new EventEmitter();

  onSubmit(): void{
    if (this.editForm.valid === !this.isValidForm) {
      this.onUpdate.emit(this.editForm.value);
      console.log(this.editForm.value);
      this.editForm.reset();
      this.editForm.controls["nameFormControl"].setErrors(null);
      this.editForm.controls["emailFormControl"].setErrors(null);
      this.editForm.controls["phoneFormControl"].setErrors(null);
      this.editForm.controls["websiteFormControl"].setErrors(null);
      this.editForm.controls["messageFormControl"].setErrors(null);
      }
    }
}
