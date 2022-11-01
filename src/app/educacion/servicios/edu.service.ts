import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';
import { EducacioncardModel } from 'src/app/_models/educacioncardmodel';



@Injectable({
  providedIn: 'root'
})
export class EduService {

constructor(private http: HttpClient) { }

//titulo
public s_updatetitulo<T>(titulo: FormData): Observable<any>{
  debugger
  return this.http.post(`${environment.apiUrl}seccion/educacion/tituloupdate`,titulo);
 }

//EDUCACION CARD -----------------------------------------------------

//Get Cards 
public getcardlist(): Observable<any>{
  return this.http.get(`${environment.apiUrl}seccion/educacion/getcardlist`);
}

/* Traer Thumbnail preview */
public getThumbnailcardPreview(thumbnailcardpreview): Observable<any>{
  return this.http.post(`${environment.apiUrl}seccion/educacion/getThumbnailcardPreview`, thumbnailcardpreview);
}

 //THUMbnail
 public s_updatethumbnailcard<T>(thumbnailcarddata: FormData): Observable<any>{
  debugger
  return this.http.post(`${environment.apiUrl}seccion/educacion/actualizarthumbnail`,thumbnailcarddata);
 }

// TITULO de card
public s_updatetitulocard<T>(titulocard: FormData): Observable<any>{
  debugger
  return this.http.post(`${environment.apiUrl}seccion/educacion/titulocardupdate`,titulocard);
 }

 //SUBTITULO de card
 public s_updatesubtitulocard<T>(subtitulocard: FormData): Observable<any>{
  debugger
  return this.http.post(`${environment.apiUrl}seccion/educacion/subtitulocardupdate`,subtitulocard);
 }

 //TITULO DE LA FECHA card
 public s_updatetitulofechacard<T>(titulofechacard: FormData): Observable<any> {
  debugger
  return this.http.post(`${environment.apiUrl}seccion/educacion/updatetitulofechacard`,titulofechacard);
 }

 public s_updatefechascard<T>(fechasData: FormData): Observable<any>{
 debugger
 return this.http.post(`${environment.apiUrl}seccion/educacion/updatefechascard`,fechasData);
 }

 public s_deletecard<T>(id): Observable<any> {
  return this.http.delete(`${environment.apiUrl}seccion/educacion/deletecards/${id}`);
 }

 //crear nueva card
 public s_crearnuevacard<T>(educacioncardmodel: FormData): Observable<any>{
  debugger
  return this.http.post(`${environment.apiUrl}seccion/educacion/creareducacioncard`,educacioncardmodel);
  }

}



