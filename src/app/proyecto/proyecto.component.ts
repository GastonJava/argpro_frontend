import { CdkDragDrop, CdkDragExit, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EsadminService } from '../share/services/esadmin.service';
import { LoginService} from '../share/services/logueado/login.service';
import { DialogComponent } from '../share/services/proyecto/dialog/dialog.component';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss']
})
export class ProyectoComponent implements OnInit {

  isLogin: boolean = true;

  esadmin: String;

  // testing cuando esta logueado
  //login: boolean = true;

  //loginn: boolean = false;
  // testing cuando esta logueado
  
  //status para verificar tag o texto en las card
  status: boolean = false;

  isCheckbox: boolean = true;

  cantidad: number = 0;

  presione2veces: boolean = false;

  private open: {[key: number] : boolean} = {};

  constructor(public dialogg: MatDialog, public _loginserv: LoginService, private esadminservice: EsadminService) { }

  
  ngOnInit() {
    this.esadminservice.currentValue.subscribe((data) => {
      this.esadmin = data;
   });
  }

 /* tags
  tags = [
    {
      tagTitle: 'Angular',
    },
     {
      tagTitle: '.Net',
    },
     {
      tagTitle: 'Html',
    }
  ];
  */

  //listas card
  cards = [
    {
      image: 'assets/proyecto/proyecttest.png',
      title: 'title1',
      description: 'Pagina personal donde un alumno se puede registras a rendir materias,  borrar todo esto que es solo para probar como se ve el alto y el ancho cuando hay un titulo mas grande que hacer en estos metodos',
    },
     {
      image: 'assets/proyecto/testing.jpg',
      title: 'title2',
      description: 'description2',
      
    },
     {
      image: 'assets/proyecto/proyecttext2.png',
      title: 'title3',
      description: 'description3',
    }
  ];

  /** TAGS DE LA CARD  ------ */

   //lista de tags main card
   maintaglist = [
    {value: 'Angular', disabled: this.isCheckbox},
    {value: '.Net', disabled: this.isCheckbox},
    {value: 'Html', disabled: this.isCheckbox},
    {value: 'Css', disabled: this.isCheckbox},
    {value: 'Typescript', disabled: this.isCheckbox},
    {value: 'MySql', disabled: this.isCheckbox},
    {value: 'Javascript', disabled: this.isCheckbox}

  ];

  //lista de cards footer cards
  footertaglist = [
    {value: 'Scrum', disabled: this.isCheckbox},
    {value: 'React', disabled: this.isCheckbox}
  ];
  dialog: any;
  name: any = "mike";
  animal: any = "perro";


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

  }

  //EXIT CUANDO NO HAYA NINGUN BADGE EN EL CONTENEDOR
  exited(event: CdkDragExit<any>){
 
  }
 

  /*
   $('.card').on('click', function() {
   if ($(this).hasClass('open')) {
     $('.card').removeClass('open');
     $('.card').removeClass('shadow-2');
     $(this).addClass('shadow-1');
     return false;
   } else {
     $('.card').removeClass('open');
     $('.card').removeClass('shadow-2');
     $(this).addClass('open');
     $(this).addClass('shadow-2');
   }
 });
 */

 
  //checkbox true | false
  checkbox(event){
    this.isCheckbox = !event.checked;

    this.status = !this.status;

    if(this.status){

    }

  }

  mi_status(index: string | number) {
    this.open[index] = !this.open[index];

    if(index != null){

    }
  }

  //abrir dialogo modal al presionar boton (editar texto)
  openDialog(): void {
    this.dialogg.open(DialogComponent, {
      panelClass:'',
      width: '100%',
      data: {

      }
    })
    
    /*
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        name: this.name,
        animal: this.animal
      }
    })*/
  }

  clickcard(event){

  }
  
}