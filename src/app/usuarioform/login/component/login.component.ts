import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { EsadminService } from 'src/app/share/services/esadmin.service';
import { LocalstorageService } from 'src/app/share/services/localstorage.service';
//import { Userdatosdto } from 'src/app/_models/iusuariodatos';
import { AlertaService } from 'src/app/_services/alerta.service';
import { GestionService } from 'src/app/_services/gestion.service';
import { ImagenService } from 'src/app/_services/imagen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild('input', {static: false}) inputRef: ElementRef;
  @ViewChild('icon', {static: false}) iconRef: ElementRef;

  form: FormGroup;
  loading = false;
  submitted = false;

  //el usuario si tiene una imagen
  tieneUserImagen: boolean;

  //public usuario: Userdatosdto;

  //usuario imagen
  //base64: SafeResourceUrl;
  base64;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gestionService: GestionService,
    private alertaService: AlertaService,
    private esadminService: EsadminService,
    private localStorage: LocalstorageService,
    private imageService: ImagenService,


  ) {}

  // obtener getter para formulario
  get formGet() { return this.form.controls; }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nombreOrEmail: ['', Validators.required],
      password: ['', Validators.required],

    });

  }

  ngAfterOnInit(){
  }

  focus(): boolean {
    return true;

  }

  inputhasvalue(): boolean {

    setTimeout(() => {
      if(this.inputRef.nativeElement.value){
        return true;
      }
  
    }, 0);
    
    return false;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertaService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;


    this.gestionService.login(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          var usuarionombre: String;
          var usuarioemail: String;
          var usuarioimagen: String;

          usuarionombre = (<any>data).usuario.nombre;
          usuarioemail = (<any>data).usuario.email;
          usuarioimagen = (<any>data).usuario.imagen;

          const user = (<any>data).tokenDeAcceso;

          const rol = (<any>data).role;
       

          this.localStorage.setStorageToken("token", JSON.stringify(user));
          //localStorage.setItem('token', JSON.stringify(user));
          this.alertaService.success('Registrado correctamente', { keepAfterRouteChange: true });

          //mandamos el usuario logged
          const usertoken = localStorage.getItem("token");

          const reader = new FileReader();
          
         //Y SI ESTA LOGUEADO... 
        if (usertoken.length > 0) {
          this.localStorage.changeTokenValue(JSON.stringify(usertoken));

          //si el token tiene datos esta logueado
          this.localStorage.setStorageEstalogueado("logueado", "SILOGUEADO");
          this.localStorage.changeLogueadoValue$("SILOGUEADO");


          //this.localStorage.changeUserData(usuarionombre, usuarioemail);
          if(rol == "ADMIN"){
            this.localStorage.setStorageRole("role", "ADMIN");
            this.localStorage.changeRolValue$("ADMIN");
          }

          if(rol == "USUARIO"){
            this.localStorage.setStorageRole("role", "USUARIO");
            this.localStorage.changeRolValue$("USUARIO");
          }


          //seteamos el logueado...
          //this.localStorage.setStorageEstalogueado("eslogueado", true);        
          //this.localStorage.changeLogueadoValue$(this.localStorage.getStorageEstalogueado("eslogueado"));
          //localStorage.setItem("eslogueado", JSON.stringify(true));
          //this.localStorage.changeLogueadoValue$(JSON.parse(localStorage.getItem("eslogueado")));

          //si el usuario tiene una imagen en la Base de datos 
          if(usuarioimagen){
            this.tieneUserImagen = true;
          
            this.base64 = 'data:image/jpg;base64,'+usuarioimagen;
            //this.localStorage.changeUserData(this.base64);
            this.imageService.changePerfilUserImageValue(this.base64);
        
          }
          
          if(!usuarioimagen){
            this.tieneUserImagen = false;
            this.imageService.changePerfilUserImageValue(null);
          }
            
          this.router.navigate(['/']);
          //this.localStorage.setStorageEstalogueado("eslogin", true);

         // SI EL TOKEN ES NULL O EXPIRO 
        } else {
          this.localStorage.changeTokenValue(null);

          //QUITAR AQUI PARA EDITARR----------------------------------------------------------------------------------------------------------------------------------------   - - -- - 
          this.localStorage.setStorageRole("role", "INVITADO");
          this.localStorage.changeRolValue$("INVITADO");
          //QUITAR AQUI PARA EDITARR----------------------------------------------------------------------------------------------------------------------------------------   - - -- - 


          //si el token NO tiene datos NO esta logueado
          this.localStorage.setStorageEstalogueado("logueado", "NOLOGUEADO");
          this.localStorage.changeLogueadoValue$("NOLOGUEADO");

          //this.localStorage.setStorageEstalogueado("eslogin", false);
          this.tieneUserImagen = false;


          //la imagen del usuario es null porque el token es null o expíro
          this.imageService.changePerfilUserImageValue(null);
        }
       
         
   
        },
        error => {
          this.alertaService.error(error);
          this.loading = false;
        });
  }
  /*
  traerimagen(useremail: String){
    return this.gestionService.getImagenByEmail(useremail);
  }
  */

  vertoken(){
    this.localStorage.eliminarStorage("token");

    this.localStorage.changeTokenValue(null);
  }

}