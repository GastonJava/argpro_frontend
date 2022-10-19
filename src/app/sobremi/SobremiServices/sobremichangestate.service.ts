import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SobremichangestateService {

 constructor() { }

 //Subjects Sobremi Imagen
 private SubjectSobremiImage = new ReplaySubject<any>(1);
 private SubjectSobremiId = new ReplaySubject<any>(1);
 //private SobremiSubject = new ReplaySubject<any>(1);

 //observables
 private SobremiImageObs$ = this.SubjectSobremiImage.asObservable();
 private SobremiId$ = this.SubjectSobremiId.asObservable();


 // observable setters --------------------------- //
 changeSobremiImageValue(sobremiImage: string){
  this.SubjectSobremiImage.next(sobremiImage);
 }

 changeSobremiIdValue(sobremiId: number) {
  this.SubjectSobremiId.next(sobremiId);
 }

 // observable getters --------------------------- //
 getSobremiImageValue(){
  return this.SobremiImageObs$;
 }

 getSobremiidValue(){
  return this.SobremiId$;
 }



}