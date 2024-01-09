import { Component } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { RestDataSource } from 'src/app/services/rest.datasource';
import { TransactionRepository } from 'src/app/repository/transaction.repository';

@Component({
  selector: 'app-lists',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class AppTransactionsComponent{

 transactions ?: Transaction[] | null ;

 constructor(private dataSource: RestDataSource, private transactionRepo:TransactionRepository) {
    this.transactionRepo.getTransactions().subscribe(t=> {
    this.transactions = t;

  })
  } 

  onDeleteTransaction(transactionId: string) {

    this.transactionRepo.deleteTransaction(transactionId).subscribe(

      (response) => {
        console.log('Transaction deleted:', response);
        // Optionally, update your UI or perform other actions after successful deletion
        window.location.reload(); // Reload the page
      },
      (error) => {
        console.error('Error deleting transaction:', error);
        // Handle errors appropriately
      }
    );
  }

  calculateSubtotal(transaction: Transaction): number {
    return transaction.quantity * transaction.amount;
  }


  enableEdit(transaction: Transaction): void {
    transaction.editable = true;

  }

  cancelChanges( transaction: Transaction){
    transaction.editable = false;
  }


  saveChanges(transactionId: string, transaction: Transaction): void {
    this.transactionRepo.editTransaction(transactionId, transaction).subscribe(

      (response) => {
        console.log('Transaction edited:', response);
        window.location.reload(); // Reload the page
      },
      (error) => {
        console.error('Error editing transaction:', error);
      }
    );

    this.calculateSubtotal(transaction);

    transaction.editable = false;
  }

  toggleDetails(event: any, transactionId: any) {
    const details = document.getElementById('details-' + transactionId);
    if (details) {
      if (details.style.display === 'none') {
        details.style.display = 'block';
      } else {
        details.style.display = 'none';
      }
    }
  }

}
