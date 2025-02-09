import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ICustomer } from '../entities/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  customer: ICustomer = this.storage.retrieve('customer');
  
  constructor(private router: Router, private storage: LocalStorageService) {}

  onSubmit() {
    if (this.email && this.password) {
      // Verifica si el email ingresado coincide con el email almacenado en 'customer'
      if (this.email === this.customer?.email) {
        // Si coincide, guardamos el usuario en localStorage y redirigimos
        localStorage.setItem('user', JSON.stringify({ email: this.email }));
        this.router.navigate(['/accounts-list']);
      } else {
        alert('Correo electrónico no encontrado. Por favor, ingrese un correo válido.');
      }
    } else {
      alert('Por favor, ingrese credenciales válidas');
    }
  }

  
}