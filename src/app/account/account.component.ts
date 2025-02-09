import { Component } from '@angular/core';
import { ICustomer } from '../entities/interfaces';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  customer: ICustomer = this.storage.retrieve('customer');

  constructor(private storage: LocalStorageService) { }
  
}
