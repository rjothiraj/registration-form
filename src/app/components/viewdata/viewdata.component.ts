import { Component, ViewChild } from '@angular/core';
import { EditUserComponent } from 'src/app/edit-user/edit-user.component';
import { User } from 'src/app/models/user';

import { RegiserServiceService } from 'src/app/services/regiser-service.service';


@Component({
  selector: 'app-viewdata',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.css'],
  providers: [RegiserServiceService],
})
export class ViewdataComponent {
  users: User[] = [];
  errorMessage: string = '';

  constructor(private registerService: RegiserServiceService) {}

  @ViewChild(EditUserComponent)
  editComp!: EditUserComponent;

  fetchUser(): void {
    this.registerService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
      },
    });
  }



isEdited = false;

  editUser(user: User,flag:boolean): void {
    this.isEdited = flag;
    this.editComp.editForm.setValue({
      id: user.id,
      nameFormControl: user.nameFormControl,
      emailFormControl: user.emailFormControl,
      phoneFormControl: user.phoneFormControl,
      websiteFormControl: user.websiteFormControl,
      messageFormControl: user.messageFormControl,
    });
    console.log(user.id);
  }


  onUpdate(user:User){
    this.registerService.editUser(user).subscribe({
      next: (user) => {
        this.users = user;
        console.log(this.users);
        this.fetchUser();
      },
    })
  }

  addUser(user: User): void {
    this.registerService.postUser(user).subscribe({
      next: (user) => {
        this.users = user;
        console.log(this.users);
        this.fetchUser();
      },
    });
    console.log(this.users);
  }

  deleteUser(userid: any) {
    this.registerService.deleteUser(userid).subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
        this.fetchUser();
      },
    });
  }

  ngOnInit() {
    this.registerService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
      },
    });
  }
}
