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

    console.log("EN EL ON INIT DE LOGIN: --------------------------------------- LOGIN ON INIT  ---------- ONINIT");

    this.form = this.formBuilder.group({
      nombreOrEmail: ['', Validators.required],
      password: ['', Validators.required],

    });

    console.log("TOKEN ESTA O NO: "+this.localStorage.getStorageToken("token"));
  }

  ngAfterOnInit(){
    console.log(this.inputhasvalue());
  }

  focus(): boolean {
    console.log("focus?: ");

    return true;
    /*
    if(this.inputRef.nativeElement.focus()){
      console.log("focus?: ");
    }
    */
  }

  inputhasvalue(): boolean {

    setTimeout(() => {
      if(this.inputRef.nativeElement.value){
        console.log("sera true");
        return true;
      }
  
    }, 0);
    
    return false;
  }

  onSubmit() {
    this.submitted = true;

    //console.log(this.formGet.id.value);
    console.log(`nombre o email: ${this.formGet.nombreOrEmail.value}`);
    console.log(`password: ${this.formGet.password.value}`);

    // reset alerts on submit
    this.alertaService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("formulario es invalido");
      return;
    }

    this.loading = true;

    /**
     * 
     *  this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
     * 
     * 
     */

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
          console.log("supuesto tokenName...n..: "+user);

          const rol = (<any>data).role;
          console.log("supuesto rol: "+rol);

          //this.localStorage.changeUserData(usuarionombre, usuarioemail, usuarioimagen);
          //this.localStorage.changeUserData();

          console.log("data puro que viene?: "+JSON.stringify(data));

          this.localStorage.setStorageToken("token", JSON.stringify(user));
          //localStorage.setItem('token', JSON.stringify(user));
          this.alertaService.success('Registrado correctamente', { keepAfterRouteChange: true });
          console.log("supuesto tokenName...n..: "+(<any>data).tokenDeAcceso);

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
          
            console.log(usuarioimagen);
            this.base64 = 'data:image/jpg;base64,'+usuarioimagen;
            //this.localStorage.changeUserData(this.base64);
            this.imageService.changePerfilUserImageValue(this.base64);
        
          }
          
          if(!usuarioimagen){
            this.tieneUserImagen = false;
            this.imageService.changePerfilUserImageValue(null);
          }
            
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

          //this.localStorage.setStorageEstalogueado("eslogueado", false);
          //this.localStorage.changeLogueadoValue$(this.localStorage.getStorageEstalogueado("eslogueado"));
          //localStorage.setItem("eslogueado", JSON.stringify(false));
          //this.localStorage.changeLogueadoValue$(JSON.parse(localStorage.getItem("eslogueado")));

          //la imagen del usuario es null porque el token es null o expíro
          this.imageService.changePerfilUserImageValue(null);













          //this.localStorage.changeRolValue$("USUARIO");














          //this.currentUser.next(null)
        }
       
         //ADMIN CREO QUE VA DENTRO DE SI EL TOKEN NO ES NULL ---------------------------------
         /*
          if(rol == "ADMIN"){
            console.log("hola soy admin");
            this.esadminService.changeValue("ADMIN");
          }
          
          if(rol == "USUARIO"){
            console.log("hola soy usuario");
            this.esadminService.changeValue("USUARIO");
          }
          */

          //si NO tiene token NO esta logueado
          //this.localStorage.changeLogueadoValue$("NOLOGUEADO");

          console.log("funciona <any>Data? desde adentro: "+(<any>data).role);
          //ADMIN CREO QUE VA DENTRO DE SI EL TOKEN NO ES NULL ----------------------------------
          
          /*
          if((<any>data).role = "USUARIO"){
            console.log("funciona <any>Data? desde adentro: "+(<any>data).role);
            this.esadminService.changeValue("USUARIO");
          }
          */
   
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
    console.log("el local storage: "+this.localStorage.getStorageToken("token"));
    this.localStorage.eliminarStorage("token");
    //this.localStorage.setStorageEstalogueado("eslogin", false);
    this.localStorage.changeTokenValue(null);
  }

}