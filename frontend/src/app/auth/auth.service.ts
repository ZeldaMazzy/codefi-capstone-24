import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUser, LoginData } from './auth.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string = "";
  public User: BehaviorSubject<User | null > = new BehaviorSubject<User | null >(null);

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.User.value !== null;
  }

  getUser() {
    return this.User.value;
  }

  registerUser(email: string, password: string, firstName: string, lastName: string) {
    const authData: CreateUser = { firstName: firstName, lastName: lastName, email: email, password: password };
    this.http.post('http://localhost:3000/api/user/signup', authData)
  }

  loginUser(email: string, password: string) {
    const authData: LoginData = { email: email, password: password };
    this.http.post('http://jsonplaceholder.typicode.com/posts', authData)
      .pipe(tap((resp: any) => {
        this.token = resp.token;
        this.User.next(resp.user);
      }))};

  logout() {
    this.token = "";
    this.User.next(null);
    this.router.navigateByUrl('/');
  }
  }

