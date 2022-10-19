import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SobremiService {
  

constructor(private http: HttpClient) { }


 /*
 public uploadimg (imagenModel: Imagen) {
   return this.http.post(`${environment.apiUrl}image/upload`, imagenModel);
 }
 */

 // ------------------------- IMAGENES ----------------------------------------- /

 /* del tipo generico */
 public uploadimg<T> (imagenModel: T):  Observable<any>{
   return this.http.post(`${environment.apiUrl}seccion/sobremi/upload`, imagenModel);
 }

 /** actualizar */
 public actualizarimg<T> (imagenModel: T): Observable<any>{
   return this.http.post(`${environment.apiUrl}seccion/sobremi/update`, imagenModel);
 }

 //eliminar imagen
 public deleteimg(id: any): Observable<any>{
  if(id != 0 || id !== null){
    return this.http.delete(`${environment.apiUrl}seccion/sobremi/delete/${id}`);
  }

 }
 
 /* request params GET ALL*/
 public getimage(): Observable<any>{
   return this.http.get(`${environment.apiUrl}seccion/sobremi/getimagen`);
 }


 // ------------------------- TITULO Y SUBTITULO  ----------------------------------------- /

 /* CON BODY Y FORMDATA
 public updatetext<T>(texto: any): Observable<any>{
  debugger
  return this.http.post(`${environment.apiUrl}seccion/sobremi/updatetext`, texto);
 }
 */

 //por parametro y sin formdata
 public updatetitulo<T>(titulo: FormData): Observable<any>{
  debugger
  return this.http.post(`${environment.apiUrl}seccion/sobremi/updatetitulo`,titulo);
 }

 public updatesubtitulo<T>(subtitulo: FormData): Observable<any>{
  debugger
  return this.http.post(`${environment.apiUrl}seccion/sobremi/updatesubtitulo`,subtitulo);
 }


}
