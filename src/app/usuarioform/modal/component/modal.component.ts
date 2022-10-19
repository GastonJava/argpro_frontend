import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle/public-api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationStart, Router, Event } from '@angular/router';
import { ModalService } from 'src/app/share/services/modal/ismodalopen.service';

export interface Modaldata {

}

@Component({
  selector: 'app-Modal',
  templateUrl: './Modal.component.html',
  styleUrls: ['./Modal.component.scss']
})
export class ModalComponent implements OnInit {

  checked = false;
  disabled = false;

  currentRoute: any;
  iscrearorlogin: boolean = false; //true - va ser CREAR y el false - va ser LOGIN

  toggle: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modaldata,
    private modalservice: ModalService,
    private router: Router,
  ){
  }

  ngOnInit() {
    this.router.navigateByUrl('/login');
  }

  toggleView(change: MatButtonToggleChange){
    this.toggle = change.value;

    if(this.toggle){
      this.router.navigateByUrl('/login');
    }else{
      this.router.navigateByUrl('/crear');
    }
  }
  
  /*
  actionFunction(){
    console.log("click");
    this.router.navigateByUrl('/crear');
    this.router.events.subscribe((ruta: Event) => {

    
      if (ruta instanceof NavigationStart) {
        console.log("inicia ahora el navigationStart");
        this.currentRoute = ruta.url;
        console.log("RUTA ACTUAL DE APP COMPONENT: " + this.currentRoute);

        
        if(this.currentRoute != "/nuevohero"){
          console.log("inicia ahora cualquier ruta de webappmarco");
          window.scrollTo(0, document.body.scrollHeight); 
        }else{

        }

        if (this.currentRoute == "/crear" || this.currentRoute == "/") {
          this.currentRoute = "/login";
          console.log("TIENE QUE QUEDARSE EN login");
        } else {
          console.log("TIENE QUE BAJAR A WEBAPP");
          this.currentRoute = "/crear";
          //window.scrollTo(0, document.body.scrollHeight);
        }

      }

    })
  
  }
  */

  closeModal(){
    this.modalservice.changeValue(false);
    this.dialogRef.close();
  }

}
