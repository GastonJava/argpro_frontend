import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { AlertaService } from 'src/app/_services/alerta.service';
import { GestionService } from 'src/app/_services/gestion.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {


  imagenenviada: boolean;

  base64: String = "";



  file: File | null = null;

  simpleFile: File;
  selectedFiles?: FileList;

  @ViewChild('formSlide', { static: false }) slideForm: ElementRef;

  //verificamos si el input de codigo del cuenta admin es visible
  //inputvisible: boolean = false;

  //Codigo admin es correcto o incorrecto
  is_cod_admin_correct: boolean;

  cuenta_admin: boolean = false;

  es_correcto_elcodigo_admin: boolean = false;

  //probar guardar en varuiabe observable
  guardarboolean$: Subject<boolean> = new Subject<false>();

  //checked dependiente solamente para CUENTA USUARIO CHECKBOX
  
  checked_cuenta_admin: boolean = false;
  checked_cuenta_usuario: boolean = true;
  //checked_cuentausuario: boolean; --original -->

  disabled: boolean = true;
  
  slided: boolean;

  form: FormGroup;
  formSlideGroup: FormGroup;
  loading = false;
  submitted = false;

  left: boolean;

  // obtener getter para formulario
  get formGet() { return this.form.controls; }

  // obtener getter para formulario Slider toggle
  get formSliderGet() { return this.formSlideGroup.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gestionService: GestionService,
    private alertaService: AlertaService

  ) { }

  ngOnInit(): void {

    //ver si obtiene el token realmente
    console.log(localStorage.getItem('token'));  //ver si obtiene el token realmente
    //ver si obtiene el token realmente

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isadmin: [0, Validators.required],
      imagenbyte: [null],
      tituloimg: [null],

    });

    this.formSlideGroup = this.formBuilder.group({
      codigoadmin: [""]
    });

    this.form.valueChanges.subscribe(
      data => {

      }
    );

    console.log("cuenta admin inicio: "+this.cuenta_admin);
    console.log("cheked admin inicio: "+this.checked_cuenta_admin);

  }

  checkbox_ir_a_admin(checked_cuenta_admin: boolean) {

    this.checked_cuenta_admin = checked_cuenta_admin;

    this.checked_cuenta_admin = true;

    this.desactivara_inputs();

    //console.log("checked_cuenta_admin es true: "+checked_cuenta_admin);

    if (this.checked_cuenta_admin) {

      console.log("dentro de 'checkbox_ir_A_admin' cuenta usuario inicio: "+this.checked_cuenta_usuario);
      console.log("dentro de 'checkbox_ir_A_admin' cheked admin inicio: "+this.checked_cuenta_admin);

      //volver el boton del timer toggle false
      this.destogglear(1500);

      //una vez que checkamos el boton de crear cuenta admin ahi si se subscribe
      this.formSlideGroup.get('codigoadmin').valueChanges.subscribe((data) => {

        //esto ACTIVA o DESACTIVA el toggle 
        if (data.length === 0) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      });

      this.checked_cuenta_usuario = false;

    }

    if (!this.checked_cuenta_admin) {
      this.activara_inputs();
      this.slided = false;
    }

  }

  checkbox_ir_a_usuario(checked_cuenta_usuario: boolean) {
    this.checked_cuenta_usuario = checked_cuenta_usuario;

    if(this.checked_cuenta_usuario){
      this.checked_cuenta_admin = false;
    }
  }

  //al togglear
  onSubmitSlideForm(slided: boolean) {
    this.slided = slided;

    if (this.formSlideGroup.invalid) {
      return;
    }

    if (this.slided) {
      
      this.enviarcodigo();
      
      this.guardarboolean$.subscribe(data => {

        console.log("cuenta admin dentro del GUARDARBOOLEAN subscripcion: : "+data);
     
        if (data) {
          this.activara_inputs();

          this.es_correcto_elcodigo_admin = data;
          

          console.log("testingboolean adentro de data: "+this.es_correcto_elcodigo_admin);
          console.log("checked a togglear - checked: "+this.checked_cuenta_admin);

          //this.checked_cuenta_admin = true;  ultmo cambio

          this.cuenta_admin = data;
          
        }
        console.log("testingboolean afuera de data es false: "+this.es_correcto_elcodigo_admin);

      }); 

    }
    //volver el boton del timer toggle false
    this.destogglear(1500);

    console.log("cuenta admin a testingboolean: "+ this.es_correcto_elcodigo_admin);
    console.log("cuenta admin a : "+ this.cuenta_admin);
    
  }

  //AL SELECCIONAR IMAGEN
  selectFile(event: any) {

    this.simpleFile = event.target.files[0];
  
    //const file = (event.target as HTMLInputElement).files[0];

    //this.form.patchValue({
      //imagen: file
    //})
    //debugger
    //this.form.get('imagen').updateValueAndValidity()

    //this.selectedFiles = event.target.files;

    //if (this.selectedFiles) {
      //const file: File | null = this.selectedFiles.item(0);
      
      //console.log("archivo desde crear componente: "+JSON.stringify(file));
      //console.log(this.selectedFiles[0]);
      //this.selectedFiles.item(0);
    //}


  }  

  // al presionar boton de enviar formulario
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertaService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if(this.es_correcto_elcodigo_admin){

      this.form.controls['isadmin'].setValue(1); 

    }else{
      this.form.controls['isadmin'].setValue(0); 
    }

    this.loading = true;

    console.log(this.form.get("imagenbyte").value);


    let imageFormData = new FormData();
   
    imageFormData.append('file', this.simpleFile);

    /*
    for (var key of imageFormData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
    debugger
    */
    //var formDatas: any = new FormData();
    
    //formDatas.append('file', new Blob([JSON.stringify(this.form.get('imagen').value)],{type: "application/json"}));
   
    //formDatas.append("file", JSON.stringify(this.form.get('imagen').value));
    //debugger
    //formDatas.get("file")
    //debugger
    this.gestionService.uploadImage(imageFormData).subscribe((data) => {
      //this.gestionService.uploadImage(formDatas.get("file")).subscribe((data) => {
      //this.gestionService.uploadImage(this.selectedFiles.item(0)).subscribe((data) => {
      console.log("se envio imagen "+data);

      this.imagenenviada = true;
      if(data.imagenbyte){
        //this.form.get("imagenbyte").patchValue({
          //imagenbyte: data.imagenbyte,
        //});

        this.form.controls['imagenbyte'].setValue(data.imagenbyte); 
        this.form.controls['tituloimg'].setValue(data.tituloimg);

        //titulo de la imagen
        //this.form.get("tituloimg").patchValue({
          //tituloimg: data.imagenbyte,
        //})
      }

      //this.form.controls['imagenbyte'].setValue();

      //debugger
      
    
      /*
      else{
        if(this.form.get("imagen") == null){

        }
        this.form.get("imagen").patchValue({
          imagen: data.file,
        })
      }
      */
      
      //debugger
      

    },
    error => {
      this.imagenenviada = false;
      console.log("erro dentro de UPLOADIMAGE: "+error.message);
    });

    //REGISTRAR USUARIO
    this.Registrarusuario(); //--------- aca registra usuario luego de guardar imagenes

    /*
    setTimeout(() => {
      if(this.imagenenviada){
        this.gestionService.register(this.form.value)
        .pipe(first())
        .subscribe(
          data => {

            debugger
            this.alertaService.success('Registrado correctamente', { keepAfterRouteChange: true });
            console.log("se envio data? "+data);

  
          },
          error => {
            console.log("error dentro de gestion REGISTER");
            this.alertaService.error(JSON.stringify(error));
            this.loading = false;
          });
    
      }
    }, 2000)
    */

    //this.gestionService.uploadImage();

   
  }

  enviarcodigo() {
    return this.gestionService.postcodigoadmin(this.formSlideGroup.value)
      .pipe(first())
      .subscribe((data) => {
        //this.alertaService.success('Registrado correctamente', { keepAfterRouteChange: true });

        if (data) {
          this.guardarboolean$.next(true);
          this.checked_cuenta_admin = false;
          this.cuenta_admin = true;
        }

        if (!data) {
          this.guardarboolean$.next(false);
          this.cuenta_admin = false;
        }

      },
      error => {
        this.alertaService.error(error);
      }
    );
  }

  Registrarusuario(){
    setTimeout(() => {
      if(this.imagenenviada){
       this.gestionService.register(this.form.value)
       .pipe(first())
       .subscribe(
        data => {

          //debugger
          this.alertaService.success('Registrado correctamente', { keepAfterRouteChange: true });
          console.log("se envio data? "+data);


        },
        error => {
          console.log("error dentro de gestion REGISTER");
          this.alertaService.error(JSON.stringify(error));
          this.loading = false;
        });
      }
    }, 2000)
  }

  //METODO TIMER PARA DESTOGLEAR EL TOOGLE
  destogglear(tiempo: number) {

    //volver el boton del toggle false
    setTimeout(() => {
      console.log("elsettimeout: ");
      this.slided = false;
    }, tiempo);

  }

  //metodo paraactivar o desactivar los inputs nombre, email y password
  activara_inputs() {
    this.form.get('nombre').enable();
    this.form.get('email').enable();
    this.form.get('password').enable();
  }

  desactivara_inputs() {
    this.form.get('nombre').disable();
    this.form.get('email').disable();
    this.form.get('password').disable();
  }

  onReset() {
    // reset whole form back to initial state
  }

  onClear() {
    // clear errors and reset ticket fields
  }



  

}