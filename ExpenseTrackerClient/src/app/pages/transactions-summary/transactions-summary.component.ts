import { Component } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';
import { TransactionRepository } from 'src/app/repository/transaction.repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions-summary',
  templateUrl: './transactions-summary.component.html',
  styleUrls: ['./transactions-summary.component.scss']
})
export class TransactionsSummaryComponent {

  transactions ?: Transaction[] | null = [];
  private dateSubscription: Subscription;

  constructor(private transactionRepo: TransactionRepository) {
    this.dateSubscription = this.transactionRepo.selectedDate$.subscribe(
      (date) => {
        
        this.transactions = date || [];  
        
        this.transactions.sort((a : Transaction, b : Transaction) =>  new Date(a.date).getDate() - new Date(b.date).getDate())  
              
      })
      
  }

  calculateSubtotal(transaction?: Transaction | null): number {
    if(!transaction){
      return 0;
    }
    return transaction.quantity * transaction.amount;
  }

  sumIncome(transactions?: Transaction[] | null): number {
    let sumIncome = 0;    
    if(transactions){
      for(let i =0; i<transactions.length; i++){
        if(transactions[i].status === "Received"){
          sumIncome = sumIncome + this.calculateSubtotal(transactions[i])
      }
      }
    }
      
    return sumIncome;
  }

  sumPayment(transactions?: Transaction[] | null): number {
    let sumPayment = 0;
    if(transactions){
      for(let i =0; i<transactions.length; i++){
        if(transactions[i].status === "Payment"){
          sumPayment = sumPayment + this.calculateSubtotal(transactions[i])
      }
      }
    }
      
    return sumPayment;
  }

  myBalance(transactions?: Transaction[] | null): number {
    let balance = 0;
    if(transactions){
      balance = this.sumIncome(transactions) - this.sumPayment(transactions) ;
    }    
    return balance;
  }

}
