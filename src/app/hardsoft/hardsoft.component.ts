import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-hardsoft',
  templateUrl: './hardsoft.component.html',
  styleUrls: ['./hardsoft.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class HardsoftComponent implements OnInit {

  @ViewChild('width', {static: true}) anchura: ElementRef;

  @ViewChild('porcentaje', {static: false}) porcentaje: MatProgressBar;

  startedClass = false;
  completedClass = false;
  preventAbuse = false;

  subirporcentaje$: Observable<number>;

  login: boolean = false;

  barraprogreso = 0;
  //ancho: number = 0;

  widthhh: number;
  //width: number = 100;

  //listas card
  cards = [

    {
      titulo: 'Desarrollo Web',
      url: 'assets/hardsoft/testinglogo1.png',

      lenguajes: [

        {
          texto: "Javascript",
          icono: "bx bxl-javascript"
        },
        {
          texto: "Diseño UX",
          icono: "bx bx-paint"
        },
        {
          texto: "HTML",
          icono: "bx bxl-html5"
        },
        {
          texto: "CSS",
          icono: "bx bxl-css3"
        },

      ]  
    },

    {
      titulo: 'Framework',
      url: 'assets/hardsoft/testinglogo1.png',   
      lenguajes: [

        {
          texto: "Angular",
          icono: "bx bxl-angular"
        },

        {
          texto: "Bootstrap",
          icono: "bx bxl-bootstrap"
        },

        {
          texto: "Node.js",
          icono: "bx bxl-nodejs"
        },

        {
          texto: ".Net",
          icono: "bx bxs-magnet"
        },
        
      ]  
    },

    {
      titulo: 'Aplicacion Movil',
      url: 'assets/hardsoft/testinglogo1.png',   
      lenguajes: 
      [
        {
          texto: "Flutter UI",
          icono: "bx bxl-flutter"
        },

        {
          texto: "Android",
          icono: "bx bxl-android"
        },
        
      ] 
    },
  ];

  //iconos de edicion cuando esta logueado
  iconos = [
    {
      icono: "",
      icon_color: "#fff",
      icon_size: 24,
    },

    {
      icono: "",
      icon_color: "#fff",
      icon_size: 24,
    },

    {
      icono: "",
      icon_color: "#fff",
      icon_size: 24,
    }
  ]

  constructor(private elemento: ElementRef) { }

  ngOnInit() {
    //this.ancho = 100;
    this.barraprogreso = window.setInterval(() => {
    /*
    this.cards.forEach((c) => {
      console.log("adentro del foreach, veces: "+c.ancho);
      this.cargarbarra();
    });
    */

    for(let i = 0; i < this.cards.length; i++){
      //this.cargarbarra(i);
    }
    }, 100);

    //this.widthhh = this.anchura.nativeElement.width;
    //console.log("ngOnInit: "+this.widthhh);
    
  }

  /*
  onStarted() {
    this.startedClass = true;
    setTimeout(() => {
      this.startedClass = false;
    }, 800);
  }

  onCompleted() {
    this.completedClass = true;
    setTimeout(() => {
      this.completedClass = false;
    }, 800);
  }
  */

  
  ngAfterViewInit(){

    /*
    for(let i = 0; i < this.cards.length; i++){

      this.subirporcentaje$ = this.porcentaje.animationEnd.pipe(
        startWith(0),
        delay(2000),
        map(() => this.cards.ancho)
      );
    }
    */

    /*
    this.cards.forEach((i) => {


      this.subirporcentaje$ = this.porcentaje.animationEnd.pipe(
        startWith(0),
        delay(2000),
        map(() => i.ancho)
      );
    });

    */

    /*
    var rootElement = this.anchura.nativeElement;
    var childElement = rootElement.firstElementChild;
    var contentElement = childElement.firstElementChild;
    */

    //let widthh = this.anchura.nativeElement.offsetWidth;
    //console.log("el width es: "+widthh);
    
    //this.widthhh = this.anchura.nativeElement.width;
    //console.log("ngAfterViewInit: "+this.widthhh);
    //this.ancho = 80;
  }
  

/*
  ngAfterViewInit(){

    setInterval(() => {

    var pb = document.getElementById("progress-bar");
    var p = document.getElementById("progress");
    var pbw = parseInt(pb.style.width);
    console.log("el ancho de la progress - bar: "+pb);
    var pw = parseInt(p.style.width);
    var increment ;
    var textspan;

    if (pbw >= pw) {
      clearInterval(); 
        p.setAttribute("class","progress");
    } else {
      increment = (pbw+1);
      pb.style.width= (pbw+1) + "%";
      pb.setAttribute("aria-valuenow",increment);
    }
    textspan = pb.getAttribute("aria-valuenow");
    document.getElementById("texto").innerHTML = textspan + "%";



    }, 100);
  }
  */
   
  /*
  cargarbarra(i){
    console.log("se repite i n-veces: "+i);

    var pb = document.getElementById("progress-bar");
    var p = document.getElementById("progress");
    var pbw = parseInt(pb.style.width); 
    
    var pw = i;

    

    console.log("el ancho de la progress-bar: "+pbw);

    console.log("el ancho de la progress: "+pw);



    var increment ;
    var textspan;

    if (pbw >= pw) {
      clearInterval(this.barraprogreso); 
        p.setAttribute("class","progress");
    } else {
      increment = (pbw+1);
      pb.style.width = (pbw+1) + "%";
      pb.setAttribute("aria-valuenow",increment);
    }
    textspan = pb.getAttribute("aria-valuenow");
    document.getElementById("texto").innerHTML = textspan + "%";
  }
  */

  animacionbar(evento){
   
  }

}