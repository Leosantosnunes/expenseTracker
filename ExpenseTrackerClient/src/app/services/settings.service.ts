import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class SettingsService {
  constructor(private datasource: RestDataSource) {}

  cPassword(currentPassword:string, newPassword: string, newPassword2:string): Observable<boolean> {
    return this.datasource.changePassword(currentPassword, newPassword,newPassword2);
  }

  dAccount():Observable<boolean>{return this.datasource.deleteMyAccount()};

  logout(): Observable<any>
  {
    console.log("working from settingservice");
    return this.datasource.logout();
  }

}
