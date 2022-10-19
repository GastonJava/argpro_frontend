import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SobremilocalstorageService {

 constructor() { }

 // sobremi local storage setters

 setStorageSobremiId(sobremiidkey, sobremiidvalue){
  localStorage.setItem(sobremiidkey, sobremiidvalue);
 }

 setStorageSobremiImage(sobremistoragekey, sobremistoragevalue: any){
  localStorage.setItem(sobremistoragekey, sobremistoragevalue);
 }

 // sobremi local storage getters
 getSobremiStorage(sobremistoragekey){
  return localStorage.getItem(sobremistoragekey);  
 }

 eliminarSobremiStorage(sobremistoragekey){
  localStorage.removeItem(sobremistoragekey);
 }


}
