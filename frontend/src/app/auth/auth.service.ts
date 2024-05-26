import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUser, LoginData } from './auth.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string = "";
  private readonly testuser: User = { firstName: 'Test', lastName: 'User', email: '', token: '' };
  public User: BehaviorSubject<User | null > = new BehaviorSubject<User | null >(this.testuser);

  constructor(private http: HttpClient, private router: Router) { 
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.token = token;
      const DecodedAccessToken = this.getDecodedAccessToken(token);
      const user: User = {
        firstName: DecodedAccessToken.firstName,
        lastName: DecodedAccessToken.lastName,
        email: DecodedAccessToken.email,
        token: token
      }
      this.User.next(user);
    }

   }

  getToken() {
    return this.token;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  
  isAuthenticated() {
    const token = localStorage.getItem(this.token);
    if (User !== null) {
      return true;
    } else if (token === null) {
      return false;
    }
    const DecodedAccessToken = this.getDecodedAccessToken(token);
    if (Date.now() > DecodedAccessToken.exp / 1000) { 
      localStorage.removeItem('token')
      return false;
    } 
    return true;



  }
  getUser() {
    return this.User.value;
  }

  registerUser(email: string, password: string, firstName: string, lastName: string) {
    const authData: CreateUser = { firstName: firstName, lastName: lastName, email: email, password: password };
    return this.http.post('http://localhost:2077/api/v1/register', authData)
    .pipe(tap((resp) => {
      this.router.navigateByUrl('/login');
  }))};

  loginUser(email: string, password: string) {
    const authData: LoginData = { email: email, password: password };
    return this.http.post('http://localhost:2077/api/v1/login', authData)
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.return.token);
        this.token = resp.return.token;
        this.User.next(resp.return);
        this.router.navigateByUrl('/dashboard');
      }))};

  logout() {
    this.token = "";
    this.User.next(null);
    this.router.navigateByUrl('/');
  }
  }

