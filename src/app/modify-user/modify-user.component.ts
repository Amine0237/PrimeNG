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
  selector: 'app-modify-user',
  standalone: true,
  imports: [ButtonModule, FormsModule, PasswordModule, KeyFilterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modify-user.component.html',
  styleUrl: './modify-user.component.scss'
})
export class ModifyUserComponent {
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

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.usersService.getUserById(this.id).subscribe(
        (data: Customer) => {
          this.user = data;

          this.userForm.patchValue({
            username: this.user.username,
            email: this.user.email, 
            firstName: this.user.firstName, 
            lastName: this.user.lastName
          });
        },
        error => {
          console.error('Failed to fetch user', error);
        }
      );
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
        id: this.user.id,
        username: this.userForm.value.username,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        password: this.userForm.value.password // Ensure your Customer interface has a password property
      };

      this.usersService.updateUserById(this.id, updatedUser).subscribe(
        (data: Customer) => {
          console.log('User updated successfully', data);
          this.router.navigate(['/users']); // Redirect to the user list or another appropriate page
        },
        error => {
          console.error('Failed to update user', error);
        }
      );
    }
  }
}
