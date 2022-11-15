import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http: HttpClient) { }

  /* request params GET ALL*/
  public getcardlist(): Observable<any>{
    return this.http.get(`${environment.apiUrl}seccion/experiencia/getcardlist`);
  }

  /* Crear nueva card completa*/
  public crearcardimagen(nuevaimgen): Observable<any>{
    return this.http.post(`${environment.apiUrl}seccion/experiencia/subirimagencard`, nuevaimgen);
  }

  /* Crear nueva card completa*/
  public crearcardnueva(nuevacard): Observable<any>{
    return this.http.post(`${environment.apiUrl}seccion/experiencia/crearnuevacard`, nuevacard);
  }

  /* Traer card preview */
  public getImgcardPreview(imgcardpreview): Observable<any>{
    return this.http.post(`${environment.apiUrl}seccion/experiencia/getImgcardPreview`, imgcardpreview);
  }

  public deletecards(): Observable<any>{
    return this.http.delete(`${environment.apiUrl}seccion/experiencia/deletecards`);
  }


  //Actualizar titulo y subtitulo

 //titulo
 public updatetitulocard<T>(titulo: FormData): Observable<any>{
  return this.http.post(`${environment.apiUrl}seccion/experiencia/updatetitulocard`,titulo);
 }

 //subtitulo
 public updatesubtitulocard<T>(subtitulo: FormData): Observable<any>{
  return this.http.post(`${environment.apiUrl}seccion/experiencia/updatesubtitulocard`,subtitulo);
 }

 //updateimg
 public updateimg(imagencarddata): Observable<any>{
  return this.http.post(`${environment.apiUrl}seccion/experiencia/actualizarimg`, imagencarddata);
}

S_borrarcardporid(id){
  return this.http.delete(`${environment.apiUrl}seccion/experiencia/borrarcardporid/${id}`);
}

}