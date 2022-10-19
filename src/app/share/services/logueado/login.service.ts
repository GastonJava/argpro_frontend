import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login: boolean;

  public _login = new Subject<boolean>();

  setState(login: boolean) {
    this._login.next(login);
  }


}
