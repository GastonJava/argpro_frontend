
import { AotSummaryResolver } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconclickService } from './share/services/footer/iconclick.service';

//import 'boxicons'

//AOS
//declare let AOS: any;

import * as AOS from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImagestorageService } from './share/services/imagestorage.service';
import { ImagenService } from './_services/imagen.service';
import { LocalstorageService } from './share/services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portfolio';

  @ViewChild('sobremi') sobremi: ElementRef;
  @ViewChild('exp') exp: ElementRef;
  @ViewChild('edu') edu: ElementRef;
  @ViewChild('proj') proj: ElementRef;
  @ViewChild('hardsoft') hardsoft: ElementRef;

  toggle2: boolean = false;

  logueado: any;

  ESADMIN:any;

  constructor (private serviceiconclick: IconclickService, private spinner: NgxSpinnerService,
    private imagenservice: ImagenService,
    private localStorageImage: ImagestorageService,
    private localStorage: LocalstorageService,
    ){

  }

  ngOnInit(){

    const logueado = this.localStorage.getStorageEstalogueado("logueado");
    this.localStorage.changeLogueadoValue$(logueado);

    //traer rol desde local storage
    const rol = this.localStorage.getStorageRole("role");
    this.localStorage.changeRolValue$(rol);


   /** spinner starts on init */
   this.spinner.show();

   setTimeout(() => {
     /** spinner ends after 5 seconds */
     this.spinner.hide();
   }, 2000); 

   /*
   AOS.init({
    disable: function() {
      var maxWidth = 760;
      return window.innerWidth < maxWidth;
    }
  });
  */
    AOS.init({disabled: ["tablet", "mobile", "phone"], once: false, delay: 0, offset: 100});

    this.serviceiconclick.disparadorClick.subscribe((data: string) => {
      console.log("presionaste boton y data es: "+data);
      
      if(data == "sobre"){
        this.sobremi.nativeElement.scrollIntoView({behavior: 'smooth'});
      }

      if(data == "exp"){
        this.exp.nativeElement.scrollIntoView({behavior: 'smooth'});
      }

      if(data == "edu") {
        this.edu.nativeElement.scrollIntoView({behavior: 'smooth'});
      }
    
      if(data == "proj") {
        this.proj.nativeElement.scrollIntoView({behavior: 'smooth'});
      }

      if(data == "hardsoft") {
        this.hardsoft.nativeElement.scrollIntoView({behavior: 'smooth'});
      }

    });

    //testing el logueado services y observables
    this.localStorage.getLogueadoValue$().subscribe(data => this.logueado = data);

       
    //testing ROLES observables escuchando cambios
    this.localStorage.getRolValue$().subscribe(data => this.ESADMIN = data);


   
  }

  /*
  public scrollView(el: HTMLElement): void {
    console.log("hola click icono htmelemnt");
    el.scrollIntoView({ behavior: "smooth" });
  }
  */

  /*
  public ScrollIntoView(el: string): void{
    
    console.log("hola click icono string");

    
    document.querySelector(el).scrollIntoView(
      {behavior: "smooth"}
    );
   
  }
  */
}
