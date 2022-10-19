import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagestorageService {

constructor() { }


  // --------------------------------------------------------------- observables

  //observables para las ID de imagenes base64
  private imageIdsubject = new ReplaySubject<number>(1);
  private imageIdobs$ = this.imageIdsubject.asObservable();
  
  //setear observable
  changeImageidValue(imageid: number){
    this.imageIdsubject.next(imageid);
  }

  //get observable
  GetImageidValue$(){
    return this.imageIdobs$;
  }
  
  //observables para las imagenes base64
  private currentImage = new ReplaySubject<string>(1);
  currentImage$ = this.currentImage.asObservable();

  changeImageValue(base64: string){
   this.currentImage.next(base64);
  }

  // --------------------------------------------------------------- localstorage IMAGES

  //local storages para las imagenes ID
  setStorageImagesId(imageIdKey: any, imageIdValue: any){
    localStorage.setItem(imageIdKey, imageIdValue);
  }

  getStorageImageId(imageidvalue){
    return localStorage.getItem(imageidvalue);
  }

  

  //local storages para las imagenes
  setStorageImages(base64key: string, base64value: string){
    localStorage.setItem(base64key, base64value);
  }

  getStorageimages(base64key: string){
   return localStorage.getItem(base64key);
  }

  eliminarStorageImages(base64key: string){
    localStorage.removeItem(base64key);
  }

  clearStorageImages(){ // esto borra todos los local storage sin discriminacion
    localStorage.clear();
  }

}