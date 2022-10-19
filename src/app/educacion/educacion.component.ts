import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EsadminService } from '../share/services/esadmin.service';
import { LocalstorageService } from '../share/services/localstorage.service';
import { EducacioncardModel } from '../_models/educacioncardmodel';
import { EduService } from './servicios/edu.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {

  ESADMIN: String;

  //seleccionar iconos edit
  toggle_titulo = {};
  toggle_subtitulo = {};
  toggle_fechatitulo = {};
  toggle_fecha = {};

  //CARD LIST
  cardlistdatabase = [];

  form_educacion: FormGroup;
  form_card: FormGroup;

  // formularioo para nuevas card
  form_nuevocard: FormGroup;

  showinputs: boolean = false;

  //toggle de card form
  showinputscardimg: boolean = false;
  //showinputscardtitulo: boolean = false;
  showinputscardfechatitulo: boolean = false;
  showinputfecha: boolean = false;

  //imagen thumbnail preview
  thumbnailpreview: any;

  /*
  cardslist: {id: number, title: string, subtitle: string, fechatitle: string, thumbnail: string, fechainicial: any}[] = [

    {
      id: 1,
      title: 'Experiencia numero 1',
      subtitle: 'ISSD Instituto Santo Domingo.',
      fechatitle: 'PERIODO DE FINALIZACION',
      thumbnail: 'assets/education/issd.jpg',
      fechainicial: ''
    },

    {
      id: 2,
      title: 'Experiencia numero 2',
      subtitle: 'Ipem 35 Ricardo Rojas.',
      fechatitle: 'PERIODO DE FINALIZACION',
      thumbnail: 'assets/education/issd.jpg',
      fechainicial: ''
    },

    {
      id: 3,
      title: 'experiencia numero 3',
      subtitle: 'Universidad Tegnologica Cordoba.',
      fechatitle: 'PERIODO DE FINALIZACION',
      thumbnail: 'assets/education/universidad.jpg',
      fechainicial: ''
    },

  ]; 

  */

  login: boolean = true;

  constructor(
    private localstorageService: LocalstorageService,
    private formBuilder: FormBuilder,
    private eduservices: EduService
  ) { }

  ngOnInit() {
    
   this.localstorageService.getRolValue$().pipe(map(rol =>{ this.ESADMIN = rol, console.log(rol)})).subscribe();

   this.formulario_educacion();

   this.formulario_card();

   this.formulario_nuevocard();

   this.Cardlist();
  }

  //formularios
  formulario_educacion(){
    this.form_educacion = this.formBuilder.group({

      titulo: ['titulo', { validators: [
          Validators.required, 
          
        ],
      }],
      titulofooter: ['', { validators: [
        Validators.required,
        Validators.minLength(3)
      ]
      }],
    });
  }

  formulario_card(){
    this.form_card = this.formBuilder.group({

      imagencard: ['imagencard', {}],

      titulocard: ['', { validators: [ Validators.required,],}],

      subtitulocard: ['', { validators: [ Validators.required]}],

      titulofechacard: ['', { validators: [Validators.required,]}],

      dateinicio: ['', { validators: [ Validators.required, Validators.minLength(3)]}],

      datefinal: ['', { validators: [Validators.required, Validators.minLength(3)]}],

    });
  }

  formulario_nuevocard(){
    this.form_nuevocard = this.formBuilder.group({

      imagencard_nuevo: ['', {}],

      titulocard_nuevo: ['', { validators: [ Validators.required,],}],

      subtitulocard_nuevo: ['', { validators: [ Validators.required]}],

      titulofechacard__nuevo: ['', { validators: [Validators.required,]}],

      dateinicio_nuevo: ['', { validators: [ Validators.required, Validators.minLength(3)]}],

      datefinal_nuevo: ['', { validators: [Validators.required, Validators.minLength(3)]}],

    });
  }

  get titlulo() {
    return this.form_educacion.controls['titulo'].value;
  }

  //GETTER INPUT cards --------------------------------------------------
  get titulocard() {
    return this.form_card.controls['titulocard'].value;
  }

  get subtitulocard() {
    return this.form_card.controls['subtitulocard'].value;
  }

  get titulofechacard() {
    return this.form_card.controls['titulofechacard'].value;
  }

  //TODO: 
  //get fechas
  get dateinicio() {
    return this.form_card.controls['dateinicio'].value;
  }

  //get fecha final
  get datefinal() {
    return this.form_card.controls['datefinal'].value;
  }

  //GETTER INPUT cards --------------------------------------------------

  // GETTER INPUT cards NUEVO -----------------------------------------------------------------
  get titulocard_nuevo() {
    return this.form_nuevocard.controls['titulocard_nuevo'].value;
  }

  get subtitulocard_nuevo() {
    return this.form_nuevocard.controls['subtitulocard_nuevo'].value;
  }

  get titulofechacard_nuevo() {
    return this.form_nuevocard.controls['titulofechacard__nuevo'].value;
  }

  //get fechas
  get dateinicio_nuevo() {
    return this.form_nuevocard.controls['dateinicio_nuevo'].value;
  }

  //get fecha final
  get datefinal_nuevo() {
    return this.form_nuevocard.controls['datefinal_nuevo'].value;
  }
  // GETTER INPUT cards NUEVO -----------------------------------------------------------------



  //get cards
  Cardlist(){
    return this.eduservices.getcardlist().pipe(map(cards => {
      this.cardlistdatabase = cards;
      console.log(this.cardlistdatabase);
      debugger
    })).subscribe();
  }


  submit_educacion(){
    console.log(this.dateinicio);
  }

  //SUBMIT CARD
  submit_nuevocard(){
    const educacioncardm = new FormData();
    //educacioncardm.titulocard(this.titulocard_nuevo);
    console.log(this.titulofechacard_nuevo);
    educacioncardm.append("titulocard", this.titulocard_nuevo);
    educacioncardm.append("subtitulocard", this.subtitulocard_nuevo);
    educacioncardm.append("thumbnailPreviewts", this.thumbnailpreview);
    educacioncardm.append("titulofechacard", this.titulofechacard_nuevo);
    educacioncardm.append("dateinicio", this.dateinicio_nuevo);
    educacioncardm.append("datefinal", this.datefinal_nuevo);

    this.eduservices.s_crearnuevacard(educacioncardm).pipe(map(data => {
      console.log(JSON.stringify(data));
      debugger
    })).subscribe();

  }

  saveTitulo(){
    const educaciondata = new FormData();
    educaciondata.append("tituloupdate", this.titulocard);

    this.eduservices.s_updatetitulo(educaciondata).pipe(map(data => console.log(data))).subscribe({next: data => data});
  }

  cerrartitulo(){
    console.log("cerrartitulo");
  }

  //IMAGEN PARA NUEVOS CARD
  ThumbnailcardPreview($thumbnailfile){
    const file_thumbnail = $thumbnailfile.target.files[0]; 

    const thumbnaildata = new FormData();
    thumbnaildata.append("thumbnailfilePreview", file_thumbnail);

    this.eduservices.getThumbnailcardPreview(thumbnaildata).pipe(map(thumbnail => {
        this.thumbnailpreview = thumbnail.imagecardPreviewts;
        debugger
    })).subscribe();
  }

  // imagen card update
  ActualizarThumbnail(id, thumbnailfile) {

    const thumbnail = thumbnailfile.target.files[0];

    let thumbnailcarddata = new FormData();
    thumbnailcarddata.append('id', id);
    thumbnailcarddata.append('imagencardpreview', thumbnail);
   
    console.log(thumbnailcarddata)

    this.eduservices.s_updatethumbnailcard(thumbnailcarddata).pipe(map(imagen => {

      console.log(imagen);

    })).subscribe(
    
      {
        next: data => {

          console.log(data);
          debugger

          this.Cardlist();
          
        },
        error: error => console.log(error)
      }
    );
  }

  //titulo card update
  ActualizarTituloCard(id){
    var titulocarddata = new FormData();
    titulocarddata.append("id", id); 
    titulocarddata.append("titulocardupdate", this.titulocard);

    this.eduservices.s_updatetitulocard(titulocarddata).pipe(map(dato => {
      //console.log(" xd : - - - "+JSON.parse(<any>dato).titulocard);
  
      this.Cardlist();
      debugger
      
    })).subscribe();
    console.log("HOASODSDASDASDAS ASD ASDAS D ASDASD ASD ADASDASDASDD D AS D AD AS D ASD ASD A DA SD AS DDD D D D DD  D D D DD D DSSSS ");
  }

  // subtitulo card update
  ActualizarSubtituloCard(id){
    var subtitulocarddata = new FormData();
    subtitulocarddata.append("id", id); 
    subtitulocarddata.append("subtitulocardupdate", this.subtitulocard);

    this.eduservices.s_updatesubtitulocard(subtitulocarddata).pipe(map(dato => dato)).subscribe();
    console.log("HOASODSDASDASDAS ASD ASDAS D ASDASD ASD ADASDASDASDD D AS D AD AS D ASD ASD A DA SD AS DDD D D D DD  D D D DD D DSSSS ");
  }

  ActualizarTitulofechacard(id){
    console.log("me parece que esto se ve aca "+this.titulofechacard);
    var titulofechacarddata = new FormData();
    titulofechacarddata.append("id", id); 
    titulofechacarddata.append("titulofechacard", this.titulofechacard);

    this.eduservices.s_updatetitulofechacard(titulofechacarddata).pipe(map(dato =>
      {
        this.Cardlist();
        debugger
      })).subscribe();
    console.log("HOASODSDASDASDAS ASD ASDAS D ASDASD ASD ADASDASDASDD D AS D AD AS D ASD ASD A DA SD AS DDD D D D DD  D D D DD D DSSSS ");
  }

  //actualizar fechas cards
  ActualizarFechascard(id) {

    var updatefechascarddata = new FormData();
    updatefechascarddata.append("id", id);
    updatefechascarddata.append("fechainicio", this.dateinicio); 
    updatefechascarddata.append("fechafinal", this.datefinal); 

    this.eduservices.s_updatefechascard(updatefechascarddata).pipe(map(data =>
      {
     
      }
    )).subscribe();
  }


  //fechas
  ActualizarFecha(){
    console.log(typeof(this.dateinicio));
    console.log("actualizar fecha . . . ");
  }

  clickcard(item){
    //this.toggle_edit[item] = !this.toggle_edit[item];
    //console.log(this.toggle_edit[item]);
  }


}
