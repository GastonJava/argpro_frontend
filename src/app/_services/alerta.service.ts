import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alerta, AlertType } from '../_models/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

private subject = new Subject<Alerta>();
private defaultId = 'default-alert';

constructor() { }

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alerta> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alerta(new Alerta({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alerta(new Alerta({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alerta(new Alerta({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alerta(new Alerta({ ...options, type: AlertType.Warning, message }));
    }

    // main alert method    
    alerta(alerta: Alerta) {
        alerta.id = alerta.id || this.defaultId;
        this.subject.next(alerta);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alerta({ id }));
    }

}
