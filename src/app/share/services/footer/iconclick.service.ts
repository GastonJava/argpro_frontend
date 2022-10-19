import { EventEmitter, Injectable, Output, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class IconclickService {

  @Output()
  public disparadorClick: EventEmitter<string> = new EventEmitter();

  iconclicked: boolean;

  public _iconclick = new Subject<boolean>();

  setState(iconclicked: boolean) {
    this._iconclick.next(iconclicked);
  }

}
