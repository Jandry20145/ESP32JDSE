import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EstadoMetabolico } from '../Interface/estado-metabolico.model';

@Injectable({
  providedIn: 'root',
})
export class BluetoothDataService {
  private datosSubject = new BehaviorSubject<EstadoMetabolico | null>(null);
  public datos$ = this.datosSubject.asObservable();

  constructor() {}

  setDatos(datos: EstadoMetabolico) {
    this.datosSubject.next({ ...datos });
  }

  getDatos(): EstadoMetabolico | null {
    return this.datosSubject.value;
  }
}
