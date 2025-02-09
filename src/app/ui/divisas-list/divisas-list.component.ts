import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { DivisasModalComponent } from '../divisas-modal/divisas-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-divisas-list',
  templateUrl: './divisas-list.component.html',
  styleUrls: ['./divisas-list.component.scss'],
})
export class DivisasListComponent implements OnInit {
  @Input() accountId?: string;
  transactions: any[] = [];
  modalRef: any;

  constructor(private modalService: NgbModal, private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    const allTransactions = this.localStorage.retrieve('transactions') || [];

    this.transactions = this.accountId
      ? allTransactions.filter((t: any) => t.accountId === this.accountId)
      : allTransactions;
  }


  // Método para abrir el modal
  openModal() {
    this.modalRef = this.modalService.open(DivisasModalComponent, {
      size: 'lg',
      backdrop: 'static'
    });
  }


}
