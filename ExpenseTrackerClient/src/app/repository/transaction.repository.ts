import { Injectable } from '@angular/core';
import { RestDataSource } from '../services/rest.datasource';
import { Transaction } from '../models/transaction';
import { Observable, Observer } from 'rxjs';
import { CategoryGroup } from '../models/category-groups';

@Injectable()
export class TransactionRepository {

    constructor(private dataSource:RestDataSource){}    

  addTransaction(newTransaction: Transaction): Observable<Transaction>
  {
    this.dataSource.loadToken();
    return this.dataSource.post('transactions/newTransaction', newTransaction)   
    // Perform POST request to add a new transaction
  }

  getTransactions(): Observable<Transaction[]>
  {
    this.dataSource.loadToken();
    return this.dataSource.get('transactions/getTransactions')
    // Perform GET request to add a new transaction
  }

  deleteTransaction(transactionId: string): Observable<any> {
    return this.dataSource.delete('transactions/deleteTransaction/', transactionId)    
  }

  editTransaction(transactionId: string, updatedTransaction: Transaction): Observable<any> {
    this.dataSource.loadToken();
    return this.dataSource.patch(`transactions/editTransaction/${transactionId}`, updatedTransaction)    
  }

  getCategoryGroups(): Observable<CategoryGroup[]> {
    return this.dataSource.get('transactions/categorygroups');    
  }
}
