import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/enviroments/enviroment';
import { EsadminService } from 'src/app/share/services/esadmin.service';
import { LocalstorageService } from 'src/app/share/services/localstorage.service';
import { ImagenService } from 'src/app/_services/imagen.service';
import { SweetAlertOptions } from 'sweetalert2';
import { SobremiService } from '../SobremiServices/sobremi.service';
import { SobremichangestateService } from '../SobremiServices/sobremichangestate.service';
import { SobremilocalstorageService } from '../SobremiServices/sobremilocalstorage.service';



@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.scss']
})
export class SobremiComponent implements OnInit {


  //enviare datos para titulo o subtitulo
  sobremiTextoData = new FormData();

  //mostrar boton de ediciones
  editaricon_isshow: boolean = false;

  sobremiid: any;
  simplefile: File;
  portadabase64: string;
  portadaimage: any;

  show: boolean = false;
  showsubtitulo: boolean = false;

  form: FormGroup;

  readonly: boolean;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  titulomessage: string;
  subtitulomessage: string;
  imageName: any;

  testvar = "Gaston Alejandro";
  subtitulo = "Me llamo Gaston y me gusta al programacion actualmente participo en Argentina programacion y estudio Carrera Terciaria de Analista de Sistemas";

  ESADMIN: String;

  estalogueado: boolean; // ver mañana --------------------

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
    private formBuilder: FormBuilder,
    private sobremiservice: SobremiService,
    private sobremiLocalStorage: SobremilocalstorageService,
    private sobremichanges: SobremichangestateService
  ) { }


  ngOnInit() {

    this.sobremiservice.getimage().pipe(map(
      (data) => {

        this.titulomessage = data.titulo,
        this.subtitulomessage = data.subtitulo;

        if(data.portada){
          this.sobremiid = data.id;
          this.portadaimage = 'data:image/jpg;base64,' + data.portada;
          this.sobremichanges.changeSobremiImageValue(this.portadaimage);

        }else{
          this.sobremichanges.changeSobremiIdValue(0);
          this.portadaimage = '';
        }

      },(error) => {
        console.log(error);
      })).subscribe();

     //this.portadaimage = this.sobremichanges.getSobremiImageValue().pipe(map(data => data));
     this.sobremichanges.getSobremiImageValue().pipe(map(data => this.portadaimage = data)).subscribe();

     this.form = this.formBuilder.group({
      portada: [''],
      portadatitulo: [''],
      titulo: ['', Validators.required],
      subtitulo: ['']
     });

     //traemos desde localstorage el rol
     const rol = this.localstorageService.getStorageRole("role");
     this.localstorageService.changeRolValue$(rol);

     this.localstorageService.getRolValue$().pipe(map(data => this.ESADMIN = data)).subscribe();

     this.localstorageService.currentUserToken$.subscribe((logueado) => {
      if (logueado == "" || logueado == null) {
        this.estalogueado = false;

      } else {
        this.estalogueado = true;
      }

     });

     //this.form.get('titulo').valueChanges.subscribe((data) =>
      //this.titulomessage = data
     //);

  }

  //get titulo() { return this.form.get('titulo'); }
  

  onSubmit(){}

  login: boolean = true;

  //Gets called when the user selects an image
  public onFileChanged(event: { target: { files: File[]; }; }) {

    //Select File
    this.selectedFile = event.target.files[0];
  }

  agregarimg($event) {

    if (this.ESADMIN == "ADMIN") {

   

        this.simplefile = $event.target.files[0];

        let imageFormData = new FormData();

        imageFormData.append('file', this.simplefile);

        this.sobremiservice.uploadimg(imageFormData).pipe(
          map(
            (data) => {

              this.sobremiid = (<any>data).id;
              const previewBase64 = (<any>data).portada;
              this.portadaimage = 'data:image/jpg;base64,' + previewBase64;


              //necesitamos enviar el id al loal storage y cambiar observable
              this.sobremichanges.changeSobremiIdValue(this.sobremiid);
              this.sobremiLocalStorage.setStorageSobremiId("sobremiid", this.sobremiid);
             

              this.sobremichanges.changeSobremiImageValue(this.portadaimage);
              this.sobremiLocalStorage.setStorageSobremiImage("storageSobremiImage", this.portadaimage);

            },
            (error: any) => {
              console.log(error);
            },
          )
        ).subscribe();

    }

  }

  //actualizar imagen
  actualizarimg($update) {

    if (this.ESADMIN == "ADMIN") {

      this.simplefile = $update.target.files[0];

      let sobremiFormdata = new FormData();
      sobremiFormdata.append('file', this.simplefile);
      sobremiFormdata.append('sobremiid', this.sobremiid);
      //sobremiFormdata.append('Sobremititulo', this.sobremititulo);

      this.sobremiservice.actualizarimg(sobremiFormdata)
        .pipe(
          map(
            (data) => {
              const previewBase64 = (<any>data).portada;
              //const sobremiId = (<any>data).sobremiid;
              if (previewBase64) {
                this.portadaimage = 'data:image/jpg;base64,' + previewBase64;

                //this.sobremiLocalStorage.setSora
                this.sobremiLocalStorage.setStorageSobremiImage("storageSobremiImage", this.portadaimage);
                this.sobremichanges.changeSobremiImageValue(this.portadaimage);
              } else {
                this.sobremiLocalStorage.setStorageSobremiImage("storageSobremiImage", this.portadaimage);
                this.sobremichanges.changeSobremiImageValue(this.portadaimage);
              }

            },
            (error: any) => { console.log(error) }
          ))
        .subscribe();
    }

  }

  //al borrar imagen
  onDelete() {
    if (this.sobremiid != null || this.sobremiid != 0) {
      this.sobremiservice.deleteimg(this.sobremiid).pipe(map(
        (data) => {

          if (data) {
            this.sobremichanges.changeSobremiIdValue(0);
            this.sobremichanges.changeSobremiImageValue('');
            this.sobremiLocalStorage.eliminarSobremiStorage("sobremiid");
            this.sobremiLocalStorage.eliminarSobremiStorage('storageSobremiImage');

          }
        },
        (error: any) => {
          console.log(error);
        }

      )).subscribe();
    }


  }

  //TODO: guardar titulo
  saveTitulo(){
    let titulodata = new FormData();
    const titulo = this.form.get('titulo').value;
    //this.subtitulomessage = this.form.get('subtitulo').value;
    if(titulo.length <= 0){
      return;
    }
    
    titulodata.append('titulo', titulo);


    
    this.sobremiservice.updatetitulo(titulodata).pipe(map(

      titulo => this.titulomessage = titulo.titulo

      //this.subtitulomessage = texto.subtitulo;
    )).subscribe();

  }

  cerrartitulo(){

  }

  //TODO: guardar subtitulo
  
  saveSubtitulo(){
    const subtitulo = this.form.get('subtitulo').value;
    let subtitulodata = new FormData();
   
    if(subtitulo.length <= 0){
      return;
    }

    subtitulodata.append('subtitulo', subtitulo);

    this.sobremiservice.updatesubtitulo(subtitulodata).pipe(map(
      
      subtitulo => this.subtitulomessage = subtitulo.subtitulo

    )).subscribe();
    
  }

  cerrarsubtitulo(){
    this.form.get('subtitulo').setValue("");
  }
  

}