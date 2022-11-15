import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { EsadminService } from '../share/services/esadmin.service';
import { LocalstorageService } from '../share/services/localstorage.service';
import { SobremilocalstorageService } from '../sobremi/SobremiServices/sobremilocalstorage.service';
import { ExperienciacardModel } from './ExperienciacardModel';
import { ExperienciaService } from './servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  imagencard_SOLO_SIN_data_imagejpg_base64: any = "";

  cargoimagen: boolean = false;

  //sweetalert
  sweetAlertOptions: SweetAlertOptions = {}
  submitAlertOpt: SweetAlertOptions = {}

  simplefile: File;

  imagecardPreviewts: any;
  imagecardPreviewdb: any;
  imagecardSOLOBYTEARRAY: any;

  showtitulo: boolean = false;
  showsubtitulo: boolean = false;
  titulomessage: string = 'EXPERIENCIA';

  //mostrar el boton de editar y guardar
  showcardinput: boolean = false;


  //toggle para cada cambio
  toggle_titulo = {};
  toggle_subtitulo = {};
  toggle_imagen = {}
  toggle_imagen_forlabel = {}


  //esadmin 
  ESADMIN: String;

  cardlistdatabase = [];

  cardgetlist2: ExperienciacardModel[] = [
    {titulocard: '', subtitulocard: '', imagencard: ''}
  ];

  cardiniciavacio = [];

  login: boolean = true;
  esadmin: String;

  //formulario card inputs
  form: FormGroup;

  //formulario inside card inputs 
  formcardedit: FormGroup;

  constructor(
    private esadminservice: EsadminService,
    private localstorageService: LocalstorageService,
    private expservices: ExperienciaService,
    private formBuilder: FormBuilder,
    private _sanitizer:DomSanitizer
  ) { }


  Cardlist(){
    return this.expservices.getcardlist().pipe(map(cards => {
      this.cardlistdatabase = cards;
    })).subscribe();
  }

  ngOnInit() {

    //sweetalert 
    this.sweetAlertOptions = {
      title: 'Desea eliminar Experiencas?',
      text: '',
      toast: false,
      titleText: '',
      showCancelButton: true,
      allowOutsideClick: false,
    };

    //sweetalert 
    this.submitAlertOpt = {
      title: 'Se ha creado una nueva experiencia',
      text: 'creacion exitosa',
      toast: true,
      titleText: 'experiencia card',
      showCancelButton: true,
      allowOutsideClick: false,
    };

    this.form = this.formBuilder.group({
      titulocard: ['', { validators: [
          Validators.required, 
          Validators.minLength(3)
        ],
      }],
      subtitulocard: ['',{ validators: [
        Validators.required,
        Validators.minLength(3)
      ]
      }],
      imagencard: [''],
    });

    //formulario inside card inputs
    this.formularioInside();


    const rol = this.localstorageService.getStorageRole("role")
    this.localstorageService.changeRolValue$(rol);
    this.localstorageService.getRolValue$().pipe(map(rol =>
      { this.ESADMIN = rol
      
      if(rol !== 'ADMIN'){
        this.showcardinput = false;
      }
      
    })).subscribe();

    this.esadminservice.currentValue.subscribe((data) => {
       //this.ESADMIN = data;
    });

    setTimeout(() => {
      this.Cardlist();
    }, 2000);
    
  }

  //formulario inside cards
  formularioInside(){
    this.formcardedit = this.formBuilder.group({

      tituloeditcard: ['hhhh', { validators: [
          Validators.required, 
          
        ],
      }],
      subtituloeditcard: ['', { validators: [
        Validators.required,
        Validators.minLength(3)
      ]
      }],
      editarimagencard: [''],
    });
  }

  //eliminar todas las cards
  deletecards(){
    this.expservices.deletecards().subscribe({
      next: data => {
        if(data){
          this.Cardlist();
        }
      },
      error: error => {
      }
    });
  }

  //Confimacion de sweet alert 2
  alertdelete() {

    Swal.fire({
      position: 'center',
      title: 'Seguro desea borrar?',
      text: 'borrar cards de experiencia.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar Cards.',
      cancelButtonText: 'No, no borrar'
    }).then((result) => {
      if (result.value) {

        this.deletecards();
       

        Swal.fire(
          'Eliminado!',
          'Experiencia Borrada Correctamente.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Experiecia card No Borrada :)',
          'error'
        )

        setTimeout(() => {
          this.Cardlist();
        }, 2000);
      }
    })


  }


  emptyList(){
   return this.cardgetlist2.forEach((cardlist2s, index) => {

    if(cardlist2s.titulocard[0].length <= 0 || cardlist2s.subtitulocard[0].length <= 0 || cardlist2s[0].imagencard.length <= 0){
      return true;
    }
     return false;
    });
  }
  
  //cargamos imagen
  subirimagen($imagencardpreview){

    this.simplefile = $imagencardpreview.target.files[0];
    let imageFormData = new FormData();

    imageFormData.append('imagencardpreview',  this.simplefile);

    this.expservices.getImgcardPreview(imageFormData).pipe(map(

      imagencardpreview => {

        if(imagencardpreview){
          this.cargoimagen = true;
        }
        this.imagencard_SOLO_SIN_data_imagejpg_base64 =  imagencardpreview.imagecardPreviewts;
        //this. imagencard_SOLO_BYTEARRAY_SIN_TEXT = imagencardpreview.imagecardPreviewts;
        this.imagecardPreviewts = 'data:image/jpg;base64,' + imagencardpreview.imagecardPreviewts,

        this.imagecardPreviewdb = imagencardpreview.imagencardPreviewdb;
      }, error => {
        if(error){
          this.cargoimagen = false;
        }
      }
      
      
    )).subscribe(); 

  }

  //inputs getters
  get titulocard() {
    return this.form.controls['titulocard'].value;
  }

  get subtitulocard(){
    return this.form.controls['subtitulocard'].value;
  }


  //crea las nuevas cards desde CERO
  crearnuevacardsubmit(){
    
    if(this.form.valid){
      
      let titulocard = this.titulocard;
      let subtitulocard = this.subtitulocard;

      const nuevacard = new FormData();
      nuevacard.append("titulocard", titulocard);
      nuevacard.append("subtitulocard", subtitulocard);

      //SIN texto 
      nuevacard.append("imagecardPreviewts", this.imagencard_SOLO_SIN_data_imagejpg_base64);
      

      this.expservices.crearcardnueva(nuevacard).pipe(map(result =>
        {
          if(result){

            
            Swal.fire(
              'Experiencia creada',
              'Experiencia Borrada Correctamente.',
              'success'
            )
            this.Cardlist();

            this.form.reset();
            this.cargoimagen = false;
          }
      
      })).subscribe();

    }
  }

  //alerta submit

  //getter and setters inputs
  get tituloeditcard() {
    return this.formcardedit.controls['tituloeditcard']?.value;
  }

  get subtitulocardedit() {
    return this.formcardedit.controls['subtituloeditcard']?.value;
  }

  //SUBMIT del form inside card inputs
  actualizarcardsubmit(){    
    let titulocardedit = this.tituloeditcard;
    let subtitulocardedit = this.subtitulocardedit;

    const nuevacard = new FormData();
    nuevacard.append("titulocardedit", titulocardedit);
    nuevacard.append("subtitulocardedit", subtitulocardedit);

  }

  //EDITAR TITULO DENTRO DE CARD actualizar
  //TODO: guardar titulo
  ActualizarTitulo(id){
    let titulodata = new FormData();
    const titulo = this.tituloeditcard;

    if(titulo.length <= 0){

      return;
    }

    titulodata.append("id" ,id);
    titulodata.append('tituloeditcard', titulo);

    this.expservices.updatetitulocard(titulodata).pipe(map(
      titulo => {
        this.titulomessage = titulo.titulo;

        if(titulo){
          this.Cardlist();
        }
      }

    )).subscribe();
    

  }

   //EDITAR TITULO DENTRO DE CARD actualizar
  //TODO: guardar titulo
  ActualizarSubtitulo(id){

    let subtitulodata = new FormData();
    const subtitulo = this.subtitulocardedit;
    if(subtitulo.length <= 0){
      return;
    }

    subtitulodata.append("id" ,id);
    subtitulodata.append('subtituloeditcard', subtitulo);

    this.expservices.updatesubtitulocard(subtitulodata).pipe(map(

      subtitulo => { this.titulomessage = subtitulo.titulo

      if(subtitulo){
        this.Cardlist();
      }

    }
      
    )).subscribe();

  }

  ActualizarImg(id, imagencard){

    //const imagencardd = imagencard.target.files[0];
    const imagen = imagencard.target.files[0];

    let imagencarddata = new FormData();
    imagencarddata.append('id', id);
    imagencarddata.append('imagencardpreview', imagen);
   


    this.expservices.updateimg(imagencarddata).pipe(map(imagen => {
    })).subscribe(
    
      {
        next: data => {
          this.Cardlist();
        },
        error: error => console.log(error)
      }
    );


  }

  //eliminar una card por su id
  borrarcardporid(id){

   //const cardformdata = new FormData();
   //cardformdata.append("id", id);

   this.expservices.S_borrarcardporid(id).subscribe({
    next: data => {
   
      this.Cardlist();
      
    
    },
    error: data => (data)
   });

  }

  //ALERTA BORRAR CARD POR ID
  alertborracardporid(id){

    Swal.fire({
      position: 'center',
      title: 'Seguro desea borrar este card?',
      text: 'borrar card de experiencia.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar Este card.',
      cancelButtonText: 'No, no borrar'
    }).then((result) => {
      if (result.value) {

        this.borrarcardporid(id);
       

        Swal.fire(
          'Eliminado!',
          'Experiencia Borrada Correctamente.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Experiencia card No Borrada :)',
          'error'
        )

        setTimeout(() => {
          this.Cardlist();
        }, 2000);
      }
    })

  }

}