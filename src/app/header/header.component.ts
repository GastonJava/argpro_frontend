import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { EsadminService } from '../share/services/esadmin.service';
import { ImagestorageService } from '../share/services/imagestorage.service';
import { LocalstorageService } from '../share/services/localstorage.service';
import { ModalService } from '../share/services/modal/ismodalopen.service';
import { ModalComponent } from '../usuarioform/modal/component/modal.component';
import { ImagenService } from '../_services/imagen.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  alertOpt: SweetAlertOptions = {}

  //variable para editar imagen de portfolio, al clickear activa los botones de editar la imagen
  editar_active: boolean = false;

  //variables de mostrar o esconder botones...
  agregarBtn: boolean;
  actualizarBtn: boolean;
  eliminarBtn: boolean;

  navbarimage: boolean;

  imageid: any;

  base64: any;


  simpleFile: File;

  public ismodalopen: boolean;

  logueado: string;

  ESADMIN: String;

  ls_Eslogueado: boolean;

  //variables de los observables
  asyncimage: Observable<any>;
  asynclogueado: any;


  base64imagen: string;

  base64imagenbyte: any;

  estalogueado: boolean;

  perfilimagen: String;

  //nombre de usuario
  nombreusuario: String;

  constructor(
    private dialog: MatDialog,
    public _ismodalopen: ModalService,
    private esadminservice: EsadminService,
    private localStorage: LocalstorageService,
    private imagenservice: ImagenService,
    private localStorageImage: ImagestorageService
  ) {

    this._ismodalopen.currentValue.subscribe(message =>
       `${this.ismodalopen = message}`); //subscribe to the currentValue observable.
  }

  ngOnInit() {

    this.alertOpt = {
      title: 'Desea eliminar imagen?',
      text: '',
      toast: false,
      titleText: '',
      showCancelButton: true,
      allowOutsideClick: false,
      
    };

    if (this.estaLogueado()) {
      this.localStorage.changeLogueadoValue$("SILOGUEADO");

      if (this.localStorage.getStorageRole("role") == "ADMIN") {

        this.localStorage.setStorageRole("role", "ADMIN");
        this.ESADMIN = this.localStorage.getStorageRole("role");

      } else if (this.localStorage.getStorageRole("role") == "USUARIO") {

        this.localStorage.setStorageRole("role", "USUARIO");
        this.ESADMIN = this.localStorage.getStorageRole("role");

      }

    } else {

      this.localStorage.changeLogueadoValue$("NOLOGUEADO");

      this.localStorage.changeRolValue$("INVITADO");

    }

    //TRAEMOS LA IMAGEN AL CARGAR COMPONENTE
    this.TraerPersonaImagen();


    //si el token existe
    this.TraerUsuarioToken();


    //ES ADMIN ???? 
    this.TraerUsuarioRole();

    //escuchamos los datos del usuario nombre email e imagen
    this.localStorage.currentUserData$.subscribe((data) => {
      this.nombreusuario = data.nombre;
    });

    //escuchamos la imagen del usuario
    this.imagenservice.perfilUserImage$.subscribe((imagen) => {
      this.perfilimagen = imagen;
    });

    this.base64imagenbyte = this.localStorageImage.getStorageimages("updateImagePreview");
    this.localStorageImage.changeImageValue(this.base64imagenbyte);
    /* no sacar esto que anda bien*/

    //ID DE LA IMAGEN
    this.localStorageImage.GetImageidValue$().subscribe(data => this.imageid = data);

    //this.ESADMIN = this.localStorage.getStorageRole("role");
    this.localStorage.getRolValue$().subscribe(data => this.ESADMIN = data);


    //traemos la imagen de del observable this.base64imagen =  
    this.asyncimage = this.localStorageImage.currentImage$.pipe(map(data => this.base64imagen = data));
    this.localStorage.getLogueadoValue$().subscribe(data => this.logueado = data);

    //this.MostrarBotones();
    
  }

  TraerPersonaImagen() {

    return this.imagenservice.getimage().pipe(map(data => {

      this.base64 = 'data:image/jpg;base64,' + data.imagenbyte;

      //get id guardar en observable y localstorage

      this.localStorageImage.setStorageImages("updateImagePreview", this.base64);
      this.localStorageImage.changeImageValue(this.base64);

      this.localStorageImage.setStorageImagesId("imageid", data.id);
      this.localStorageImage.changeImageidValue(data.id);

    })).subscribe();

  }

  estaLogueado() {

    if (this.localStorage.getStorageToken("token")) {
      return true;
    }

    return false;
  }

  TraerUsuarioToken() {

    if (this.localStorage.getStorageToken("token")) {
    }

    if (!this.localStorage.getStorageToken("token")) {
      this.localStorage.setStorageRole("role", "INVITADO"); //------------------------------------------- CAMBIAR ROLES (this.localStorage.setStorageRole("role", "USUARIO");)
      this.ESADMIN = this.localStorage.getStorageRole("role");
    }

  }

  TraerUsuarioRole() {
    this.esadminservice.currentValue.subscribe((data) => {
    });
  }

  //metodo para saber si los lobotnes apareceran 
  MostrarBotones() {

    if (this.logueado == "SILOGUEADO" && this.ESADMIN == "ADMIN") {

      // Si la persona tiene imagen 
      if (this.base64imagenbyte.length > 0) {
        this.agregarBtn = false;
        this.actualizarBtn = true;
        this.eliminarBtn = true;
      }

      if (this.base64imagenbyte.length < 0) {
        this.agregarBtn = true;
        this.actualizarBtn = false;
        this.eliminarBtn = false;
      }

    }

    return true;
  }

  //abrir dialogo modal al presionar boton (editar texto)
  openDialog(): void {

    this._ismodalopen.changeValue(true);
    this.dialog.open(ModalComponent, {
      disableClose: true,
      panelClass: ['app-full-bleed-dialog', 'mat-dialog-container'],
      width: '100%',
      data: {
      }
    })
  }

  onSave($event) {

    if (this.ESADMIN == "ADMIN") {

      if (this.imageid == null || this.imageid == 0) {

        this.simpleFile = $event.target.files[0];

        let imageFormData = new FormData();

        imageFormData.append('file', this.simpleFile);

        this.imagenservice.uploadimg(imageFormData).pipe(
          map(
            (data) => {
              const imageid = (<any>data).id;
              const previewBase64 = (<any>data).imagenbyte;

              this.base64 = 'data:image/jpg;base64,' + previewBase64;
           
              //necesitamos enviar el id al loal storage y cambiar observable
              this.localStorageImage.setStorageImagesId("imageid", imageid);
              this.localStorageImage.changeImageidValue(imageid);

              this.localStorageImage.setStorageImages("updateImagePreview", this.base64);
              this.localStorageImage.changeImageValue(this.base64);

            },
            (error: any) => {
              console.log(error);
            },
          )
        ).subscribe();

      }


    }

  }

  onUpdate($update) {

    if (this.ESADMIN == "ADMIN") {

      if (this.imageid != null || this.imageid != 0) {

        this.simpleFile = $update.target.files[0];

        let imageFormData = new FormData();

        imageFormData.append('file', this.simpleFile);
        imageFormData.append("imageid", this.imageid);

        this.imagenservice.actualizarimg(imageFormData).pipe(
          map(
            (data) => {

              const previewBase64 = (<any>data).imagenbyte;

              this.base64 = 'data:image/jpg;base64,' + previewBase64;

              this.localStorageImage.setStorageImages("updateImagePreview", this.base64);
              this.localStorageImage.changeImageValue(this.base64);

            },
            (error: any) => { console.log(error) }
          )).subscribe();
      }
    }

  }

  //al borrar imagen
  
  onDelete() {
    if (this.imageid != null || this.imageid != 0) {
      this.imagenservice.deleteimg(this.imageid).pipe(map(
        (data) => {
          if(data){
            //this.localStorageImage.setStorageImagesId("imageid", 0);
            this.localStorageImage.changeImageidValue(null);
            this.localStorageImage.eliminarStorageImages("imageid");

            //eliminamos imagen del storage
            this.localStorageImage.changeImageValue(null);
            this.localStorageImage.eliminarStorageImages("updateImagePreview");
          }
        },
        (error: any) =>{
        }

      )).subscribe();
    }

  }
  

  cerrarsession() {

    this.localStorage.eliminarStorage("token");

    // ------------------- ROLE ------------------------//
    this.localStorage.setStorageRole("role", "INVITADO"); 
    this.localStorage.changeRolValue$("INVITADO");
    this.localStorage.eliminarStorage("role");

    // ------------------- LOGUEADO -----------------------//
    this.localStorage.setStorageEstalogueado("logueado", "NOLOGUEADO");
    this.localStorage.changeLogueadoValue$("NOLOGUEADO");
    this.localStorage.eliminarStorage("logueado");



    this.localStorage.changeTokenValue(null);
    this.localStorage.clearStorage();

  }

  // SweetAlert2 ----- ------------- -----------
  confirmarDeleteimg($event){

    Swal.fire({
      position: 'center',
      title: 'Seguro desea borrar?',
      text: 'podra volver a subir otra imagen.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar imagen.',
      cancelButtonText: 'No, no borrar'
    }).then((result) => {
      if (result.value) {

        this.onDelete();

        Swal.fire(
          'Eliminado!',
          'Imagen Borrada Correctamente.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Imagen No Borrada :)',
          'error'
        )
      }
    })

   
  }

  cancelDeleteimg($event){
  }

}