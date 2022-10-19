import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IconclickService } from '../share/services/footer/iconclick.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  //@ViewChild ('containerimg-sm', {static: false}) containerimgsm: ElementRef;
  @ViewChild('containerimg-exp') containerimgexp: ElementRef;

  toggle: string = "sobre";
  toggle2: boolean = false;

  constructor(
    private iconclickservices: IconclickService, 
    private render: Renderer2,
    private elem: ElementRef) { }

  ngOnInit() {
  }

  iconclick(event: string){
    console.log("funciona click: "+event);
    this.iconclickservices.disparadorClick.emit(event);

    const containersm = this.elem.nativeElement.querySelector('.containerimg-sm');
    const containerexp = this.elem.nativeElement.querySelector('.containerimg-exp');
    const containeredu = this.elem.nativeElement.querySelector('.containerimg-edu');
    const containerproj = this.elem.nativeElement.querySelector('.containerimg-proj');

    if(event == "sobre"){
      //console.log("solo sobre mi: ");
      //this.toggle = "sobre";
      //const containersm = this.elem.nativeElement.querySelector('.containerimg-sm');
      //this.render.setStyle(containersm, 'background-color', '#00000059');

    }

    if(event == "exp"){
      //this.toggle = "exp";
      //this.render.setStyle(containerexp, 'background-color', '#00000059');
    }

    if(this.toggle){
      //console.log("toggle: "+this.toggle);
      //this.render.setStyle(containerexp, 'background-color', '#00000059');
    }

    if(event == "edu"){

    }

    if(event == "proj") {

    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}