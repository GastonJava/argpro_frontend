import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsuarioDatos } from 'src/app/_models/iusuariodatos';
//import { Userdatosdto } from 'src/app/_models/iusuariodatos';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  //private isadmin = new BehaviorSubject<String>("USUARIO");
  //currentValue = this.isadmin.asObservable();

 constructor() { }


 //observables
 private currentUserToken = new ReplaySubject<String>(1);
 currentUserToken$ = this.currentUserToken.asObservable();

  changeTokenValue(token: String){
   this.currentUserToken.next(token);
  }

  //observable cambiamos el nombre, email y imagen del usuario en un mismo observable
  private currentUserData = new ReplaySubject<any>(1);
  currentUserData$ = this.currentUserData.asObservable();

  //changeUserData(nombre?: String, email?: String, imagen?: String){
    //this.currentUserData.next({nombre, email, imagen});
  //}

  //observable para el estalogueado
  private logueadosubject = new ReplaySubject<any>(1);
  private logueadoobs$ = this.logueadosubject.asObservable();

  changeLogueadoValue$(logueadovalue: string){
    this.logueadosubject.next(logueadovalue);
  }

  getLogueadoValue$(){
    return this.logueadoobs$;
  }

  //observable para rol
  private rolsubject = new ReplaySubject<any>(1);
  private rolobs$ = this.rolsubject.asObservable();

  changeRolValue$(rol: string){
    this.rolsubject.next(rol);
  }

  getRolValue$(){
    return this.rolobs$;
  }

  //changeUserData(iusuariodatos: IUsuarioDatos){
    //this.currentUserData.next({email});
  //}

  //observable cambiamos el nombre, email y imagen del usuario en un mismo observable

// ------------------------- esta logueado? ------------------------|  
public setStorageEstalogueado(esloginkey, esloginvalue){
  localStorage.setItem(esloginkey, JSON.stringify(esloginvalue));
}

public getStorageEstalogueado(esloginkey: string){
  return JSON.parse(localStorage.getItem(esloginkey));
}
// ------------------------- esta logueado? ------------------------|  


// ------------------------- ROLE .. ------------------------|  
public setStorageRole(keyrole: string, valuerole: string) {
  localStorage.setItem(keyrole, JSON.stringify(valuerole));
}


public getStorageRole(keyrole: string) {
  return JSON.parse(localStorage.getItem(keyrole));
}

// ------------------------- ROLE .. ------------------------|  


 public setStorageToken(key: string, value: string) {
   localStorage.setItem(key, value);
 }

 public getStorageToken(key: string) {
   return localStorage.getItem(key);
 }

 public eliminarStorage(key: string) {
   localStorage.removeItem(key);
 }

 public clearStorage() {
   localStorage.clear();
 }

 //si el usuario esta logueado 
 /*
 isLogged() 
 {
  const user = localStorage.getItem("token");
  
  if (user) {
    this.currentUser.next(JSON.parse(user))
  } else {
    this.currentUser.next(null)
  }
       
  return user;
 }
 */

}

