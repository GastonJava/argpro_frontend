import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-observerinput',
  templateUrl: './observerinput.component.html',
  styleUrls: ['./observerinput.component.scss']
})
export class ObserverinputComponent implements OnInit {

  constructor() { }

  @Input() imagen$: Observable<any>;

  imagen;

  ngOnInit() {
  }

  onChange($event: Event){
    const file = ($event.target as HTMLInputElement).files[0];
    this.converToBase64(file);
    console.log(file);
  }

  converToBase64(file: File){
    this.imagen$ = new Observable((subscriber: Subscriber<any>) => {
      this.readfile(file, subscriber);
    });

    /*modo subscriber original
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readfile(file, subscriber);
    });
    */

    /* modo subscriber original
    observable.subscribe(
      (datos) => {
      console.log(datos);
      this.imagen = datos;
      },

      (error) => {
        alert(error);
      }
    );
    */

  }

  readfile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
      console.log(filereader.result);
    };

    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    }

    console.log(filereader.result);
  }

}
