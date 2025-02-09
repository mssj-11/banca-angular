import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FastForexService } from 'src/app/services/fast-forex.service';
import { IAccount, ICustomer } from '../../entities/interfaces';
import { LocalStorageService } from 'ngx-webstorage';  // Asegúrate de importar esto
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-divisas-modal',
  templateUrl: './divisas-modal.component.html',
  styleUrls: ['./divisas-modal.component.scss'],
})
export class DivisasModalComponent implements OnInit {
  @Input() account?: IAccount;

  currencies: { code: string; name: string }[] = [];
  form: FormGroup;
  customer: ICustomer | undefined;

  constructor(
    private fb: FormBuilder,
    private fastForexService: FastForexService,
    private localStorage: LocalStorageService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      fromAccount: [null, Validators.required],
      currency: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      type: ['buy', Validators.required],
    });
  }

  ngOnInit(): void {
    // Recuperamos los datos del cliente desde LocalStorage
    this.customer = this.localStorage.retrieve('customer');
    
    // Si customer está correctamente recuperado, lo mostramos por consola
    if (this.customer) {
      console.log(this.customer);
    } else {
      console.log('No se encontraron datos de cliente en LocalStorage');
    }

    this.fastForexService.getCurrencies().subscribe((data: any) => {
      this.currencies = Object.keys(data.currencies).map(key => ({
        code: key,
        name: data.currencies[key]
      }));
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
  
    const transaction = this.form.value;
    const selectedAccount = transaction.fromAccount;  // Aquí obtenemos el objeto completo de la cuenta seleccionada
  
    // Si la cuenta seleccionada existe, agregamos la transacción
    if (selectedAccount) {
      const transactions = this.localStorage.retrieve('transactions') || [];
  
      transactions.push({
        ...transaction,
        accountId: selectedAccount.accountId,  // Usamos el accountId de la cuenta seleccionada
        accountName: selectedAccount.accountName, // Guardamos también el accountName
        transactionDate: new Date(),
      });
  
      // Guardamos las transacciones en LocalStorage
      this.localStorage.store('transactions', transactions);
  
      alert('Operación realizada con éxito.');
      this.closeModal();
    } else {
      alert('Por favor seleccione una cuenta de origen.');
    }
  }
  

  closeModal() {
    console.log('Modal cerrado.');
    this.activeModal.close(); 
  }
  

}
