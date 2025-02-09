import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import Customer from 'src/assets/json/customer.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'banca';
  customer = Customer;
  isLoggedIn: boolean = false; // estado del login

  constructor(private storage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.storage.store('customer', this.customer);
    // Verifica si hay un usuario logueado
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;
  }

  logout() {
    //this.storage.clear(); // Borra el almacenamiento local
    localStorage.removeItem('user');
    this.isLoggedIn = false; // Actualiza el estado de login
    this.router.navigate(['/login']);
  }


}
