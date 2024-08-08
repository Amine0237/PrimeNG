import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {path: '', component: HomeComponent}, 
  {path: 'users', component: UsersComponent}, 
  {path: 'users/modify/:id', component: ModifyUserComponent}, 
  {path: 'users/add', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
