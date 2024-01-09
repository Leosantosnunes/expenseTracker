import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RestDataSource } from '../services/rest.datasource';

@Injectable()
export class SettingsRepository {
  constructor(private datasource: RestDataSource) {}

  cPassword(currentPassword:string, newPassword: string, newPassword2:string): Observable<boolean> {
    return this.datasource.changePassword(currentPassword, newPassword,newPassword2);
  }  
  

  deleteMyAccount(): Observable<boolean> {
    this.datasource.loadToken();
    if (!this.datasource.authToken) {
      return throwError('Authentication token missing');
    }
    return this.datasource.delete('myaccount/deleteMyAccount');    
  }  

  logout(): Observable<any> {
    this.datasource.authToken = null!;
    localStorage.clear();
    return this.datasource.get('myaccount/logout');  
  }

}
