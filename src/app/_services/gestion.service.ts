import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../enviroments/enviroment';
import { Codigoadmin } from '../_models/codigoadmin';
import { Logindto } from '../_models/logindto';
import { Usuario } from '../_models/usuario';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  httpOptionsText = {
    headers: new HttpHeaders({
      Accept: "text/plain",
      "Content-Type": "text/plain"
    }),
    responseType: "text" as "json"
  };

  clear() {
    throw new Error('Method not implemented.');
  }
  success(arg0: string, arg1: {
    // update stored user if the logged in user updated their own record
    keepAfterRouteChange: boolean;
  }) {
    throw new Error('Method not implemented.');
  }
  error(error: any) {
    throw new Error('Method not implemented.');
  }

  private usuarioSubject: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
    this.usuario = this.usuarioSubject.asObservable();
  }

  public get userValue(): Usuario {
    return this.usuarioSubject.value;
  }

  /*
  login(usuario, contrasenia) {
     return this.http.post<Usuario>(`${environment.apiUrl}/iniciarSesion`, {usuario, contrasenia})
     .pipe(map(usuario => {
         localStorage.setItem('user', JSON.stringify(usuario));
         this.usuarioSubject.next(usuario);
         return usuario;
     }));
  }
  */

  login(userlogin: Logindto) {
    return this.http.post<Logindto>(`${environment.apiUrl}auth/iniciarSesion`, userlogin)
      .pipe(map(usuario => {
        localStorage.setItem('user', JSON.stringify(usuario));
        //this.usuarioSubject.next(usuario);

        console.log("denro de login gestion service TOKEN: " + usuario);
        //console.log("este seria el token: "+usuario.password);
        return usuario;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.usuarioSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  //upload image service
  uploadImage(imagen): Observable<any> {
    //const formData = new FormData(imagen[0]);

    //formData.append('imagen', imagen);
    //debugger
    //return this.http.post('/api/v1/image-upload', formData);
    return this.http.post(`${environment.apiUrl}gestionusuario/usuario/upload`, imagen,{


      /*
      headers: {
        'Content-Type': 'file',
      },
      */

      /*
      headers: new HttpHeaders({
        Accept: "text/plain",
        "Content-Type": "text/plain"
      }),
      responseType: "text" as "json"
      */
      /*
      headers: new HttpHeaders()
     .set('Content-Type', 'multipart/form-data')
     */
    });
  }

  getImagenByEmail(useremail: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}gestionusuario/usuario/getImagebyemail/${useremail}`);
  }

  register(user: Usuario) {
    return this.http.post(`${environment.apiUrl}auth/registrar`, user);
  }

  postcodigoadmin(codadmin: Codigoadmin) { //: Observable<any>
    return this.http.post(`${environment.apiUrl}auth/codigoadmin`, codadmin).pipe(map((response: any) => response));
  }

  getAll() {
    return this.http.get<Usuario[]>(`${environment.apiUrl}auth/users`);
  }

  getById(id: string) {
    return this.http.get<Usuario>(`${environment.apiUrl}auth/users/${id}`);
  }

  

  update(id, params) {
    return this.http.put(`${environment.apiUrl}auth/users/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.usuarioSubject.next(user);
        }
        return x;
      }
      ));
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  //roles -----------------------------------------
  rolesCoinciden(rolesPermitidos): boolean {

    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('jwt').split('.')[1]));
    var userRole = payLoad.role;


    rolesPermitidos.forEach(element => {
      //element trae el rol de la lista que tnemos en la ruta


      //userRole trae el role desde el token

      if (userRole == element) {

        isMatch = true;
        return false;
      }
    });

    return isMatch;
  }






}