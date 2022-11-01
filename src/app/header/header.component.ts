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

  //ismodalopen$: Observable<boolean>;
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

    this._ismodalopen.currentValue.subscribe(message => console.log(`subcripcion: esta modal abierto?: ${this.ismodalopen = message}`)); //subscribe to the currentValue observable.
    //this.ismodalopen$ = this._ismodalopen.currentValue.pipe(map(state => state));
  }

  ngOnInit() {
    console.log("ON INIT DEL HEADER: ------------------------------------ ");

    this.alertOpt = {
      title: 'Desea eliminar imagen?',
      text: '',
      toast: false,
      titleText: '',
      showCancelButton: true,
      allowOutsideClick: false,
      
    };

    if (this.estaLogueado()) {
      console.log("logueado");
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
      console.log("no logueado");

    }

    //TRAEMOS LA IMAGEN AL CARGAR COMPONENTE
    this.TraerPersonaImagen();


    //si el token existe
    this.TraerUsuarioToken();
    //console.log("funciona o no funciona " + this.estalogueado);

    //ES ADMIN ???? 
    this.TraerUsuarioRole();

    //this.asynclogueado = this.localStorage.getLogueadoValue$();

    //escuchamos los datos del usuario nombre email e imagen
    this.localStorage.currentUserData$.subscribe((data) => {
      //console.log("el dato NOMBRE en el header del nginit y del currentUserData es: "+data.nombre);
      this.nombreusuario = data.nombre;
    });

    //escuchamos la imagen del usuario
    this.imagenservice.perfilUserImage$.subscribe((imagen) => {
      this.perfilimagen = imagen;
    });

    /* no sacar esto que anda bien*/
    this.base64imagenbyte = this.localStorageImage.getStorageimages("updateImagePreview");
    this.localStorageImage.changeImageValue(this.base64imagenbyte);
    /* no sacar esto que anda bien*/

    //ID DE LA IMAGEN
    this.localStorageImage.GetImageidValue$().subscribe(data => this.imageid = data);

    //this.ESADMIN = this.localStorage.getStorageRole("role");
    this.localStorage.getRolValue$().subscribe(data => this.ESADMIN = data);


    //traemos la imagen de del observable this.base64imagen =  
    this.asyncimage = this.localStorageImage.currentImage$.pipe(map(data => this.base64imagen = data));
    //this.asynclogueado = this.localStorage.getLogueadoValue$.pipe(map(data => console.log("la data dentro del localstorage loguao: "+data)));
    this.localStorage.getLogueadoValue$().subscribe(data => this.logueado = data);
    console.log("limagen tiene es: " + this.base64imagenbyte);

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
      //this.esadmin = data;
      console.log("es admin en SOBREMI - oninit: " + data);
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

  ngAfterViewInit() {
    //console.log("is VALID???: "+this.ismodalopen$);
    //this.ismodalopen$ = this._ismodalopen._ismodalopen.pipe(map(state => state));
    //this.ismodalopen$ = this._ismodalopen._ismodalopen.asObservable();
    //console.log("true o false?: "+this.ismodalopen$.pipe(filter(state => state)));
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
    console.log("save . . . ");

    if (this.ESADMIN == "ADMIN") {

      if (this.imageid == null || this.imageid == 0) {

        this.simpleFile = $event.target.files[0];

        let imageFormData = new FormData();

        imageFormData.append('file', this.simpleFile);

        this.imagenservice.uploadimg(imageFormData).pipe(
          map(
            (data) => {
              console.log((<any>data).imagenbyte);
              const imageid = (<any>data).id;
              const previewBase64 = (<any>data).imagenbyte;

              this.base64 = 'data:image/jpg;base64,' + previewBase64;
           

              // --------------------------------------------------------------------------- AREA DE TESTEOSSSSSS LUEGO BORRARRRRRRRR

              console.log();
              //necesitamos enviar el id al loal storage y cambiar observable
              this.localStorageImage.setStorageImagesId("imageid", imageid);
              this.localStorageImage.changeImageidValue(imageid);

              this.localStorageImage.setStorageImages("updateImagePreview", this.base64);
              this.localStorageImage.changeImageValue(this.base64);


              // --------------------------------------------------------------------------- AREA DE TESTEOSSSSSS LUEGO BORRARRRRRRRR

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
    console.log("update . . .");

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

      console.log("imagen id es null no hay imagen: ");
    }

  }

  //al borrar imagen
  
  onDelete() {
    console.log("delete . . .");
    if (this.imageid != null || this.imageid != 0) {
      this.imagenservice.deleteimg(this.imageid).pipe(map(
        (data) => {
          console.log(data);
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

    console.log("No hay imagen para actualizar");

  }
  

  cerrarsession() {

    this.localStorage.eliminarStorage("token");

    // ------------------- ROLE ------------------------//
    this.localStorage.setStorageRole("role", "INVITADO"); //------------------------------------- CAMBIAR AQUI (this.localStorage.setStorageRole("role", "USUARIO")) ----------------------------------------------------------------------
    this.localStorage.changeRolValue$("INVITADO"); // ------------------------------------------- CAMBIAR AQUI (this.localStorage.changeRolValue$("USUARIO");) --------------------------------------
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
    console.log($event);

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
    console.log($event);
  }


}
