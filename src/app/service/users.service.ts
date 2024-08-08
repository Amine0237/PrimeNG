import { Injectable } from '@angular/core';
import { Customer } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/api/app-users';

  getCustomersLarge(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get<Customer>(url);
  }

  updateUserById(id: number, user: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Customer>(url, user, httpOptions);
  }

  addUser(user: Customer): Observable<Customer>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Customer>(this.apiUrl, user, httpOptions);

  }

  deleteUserById(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log('deletedUser in the service');
    
    return this.http.delete<void>(url);
  }
}
