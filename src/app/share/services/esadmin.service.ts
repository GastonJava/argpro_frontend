import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EsadminService {

constructor() { }

private isadmin = new BehaviorSubject<String>("USUARIO");
currentValue = this.isadmin.asObservable();

  changeValue(value: String){
    this.isadmin.next(value)
  }

}
