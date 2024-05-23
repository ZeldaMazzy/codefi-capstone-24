import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUser, LoginData } from './auth.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string = "";
  public User: BehaviorSubject<User | null > = new BehaviorSubject<User | null >(null);

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
    return this.http.post('http://localhost:3000/api/user/signup', authData)
  }

  loginUser(email: string, password: string) {
    const authData: LoginData = { email: email, password: password };
    return this.http.post('http://jsonplaceholder.typicode.com/posts', authData)
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

