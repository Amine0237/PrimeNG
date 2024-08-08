import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { Customer } from '../models/user.model';
import { ButtonModule } from 'primeng/button';
import { PasswordValidator } from '../shared/password.validator';



@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ButtonModule, FormsModule, PasswordModule, KeyFilterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  userForm!: FormGroup;
  id!: number;
  user!: Customer;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router , private usersService: UsersService){}
  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, PasswordValidator.strongPassword()]],
      email: ['', [Validators.required, Validators.email]]
    });
  }



  passwordd = "";

  get username() {
    return this.userForm.get('username');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('lastName');
  }

  get password() {
    return this.userForm.get('lastName');
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: Customer = {
        id: null,
        username: this.userForm.value.username,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        password: this.userForm.value.password // Ensure your Customer interface has a password property
      };

      this.usersService.addUser(updatedUser).subscribe(
        (data: Customer) => {
          console.log('User added successfully', data);
          this.router.navigate(['/users']); // Redirect to the user list or another appropriate page
        },
        error => {
          console.error('Failed to add user', error);
        }
      );
    }
  }
}
