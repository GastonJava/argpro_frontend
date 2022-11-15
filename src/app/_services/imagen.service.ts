import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../enviroments/enviroment";
import { Imagen } from "../_models/imagen";

@Injectable({
    providedIn: 'root'
  })
  export class ImagenService {

    constructor(private http: HttpClient) {}

    //observables USUARIO imagen
    private perfilUserImage = new BehaviorSubject<String>("");
    perfilUserImage$ = this.perfilUserImage.asObservable();

    changePerfilUserImageValue(imagen: String){
      this.perfilUserImage.next(imagen)
    }

    //observables navbar imagen... // esto seria del usuario no de la persona del portfolio
    private perfilNavbarImage = new BehaviorSubject<String>("");
    perfilNavbarImage$ = this.perfilNavbarImage.asObservable();

    changePerfilNavbarImageValue(navbarimagen){ 
      this.perfilNavbarImage.next(navbarimagen);
    }

    /*
    public uploadimg (imagenModel: Imagen) {
      return this.http.post(`${environment.apiUrl}image/upload`, imagenModel);
    }
    */
    

    /* del tipo generico */
    public uploadimg<T> (imagenModel: T):  Observable<any>{
      return this.http.post(`${environment.apiUrl}seccion/navbar/upload`, imagenModel);
    }

    /** actualizar */
    public actualizarimg<T> (imagenModel: T): Observable<any>{
      return this.http.post(`${environment.apiUrl}seccion/navbar/update`, imagenModel);
    }

    public deleteimg(id): Observable<any>{
      return this.http.delete(`${environment.apiUrl}seccion/navbar/delete/${id}`);
    }
    
    /* request params GET ALL*/
    public getimage(): Observable<any>{
      return this.http.get(`${environment.apiUrl}seccion/navbar/getimagen`);
    }

    /*
    public getimage(base64preview){
      return this.http.get(`${environment.apiUrl}seccion/navbar/update/${base64preview}`);
    }
    */ // PATHVARIABLE enviado por URL
  }