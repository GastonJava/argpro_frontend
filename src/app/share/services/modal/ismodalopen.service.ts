import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ModalService {
  
    /*
    ismodalopen: boolean;
  
    public _ismodalopen = new Subject<boolean>();
  
    setState(ismodalopen: boolean) {
      this._ismodalopen.next(ismodalopen);
    }
    */

    private ismodalopen = new BehaviorSubject<boolean>(false);
    currentValue = this.ismodalopen.asObservable();

    changeValue(value: boolean) {
      this.ismodalopen.next(value)
    }
  
  }
  