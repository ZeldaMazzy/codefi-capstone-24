import { Component } from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({ 
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css']
})

export class RegisterComponent { 
  isLoading = false;
  constructor(public authService: AuthService) {} 
  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.registerUser(form.value.email, form.value.password, form.value.firstName, form.value.lastName).subscribe();
  }
}