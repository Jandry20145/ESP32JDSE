import { Component } from '@angular/core';
import { BluetoothDataService } from '../services/bluetooth-data.service';
import { EstadoMetabolico } from '../Interface/estado-metabolico.model';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lector',
  templateUrl: './lector.page.html',
  styleUrls: ['./lector.page.scss'],
  standalone: false,
})
export class LectorPage {
  datos: EstadoMetabolico | null = null;
  private datosSub!: Subscription;

  constructor(
    private bluetoothDataService: BluetoothDataService,
    private cd: ChangeDetectorRef
  ) {}

  ionViewWillEnter() {
    this.datosSub = this.bluetoothDataService.datos$.subscribe((data) => {
      this.datos = data;
      this.cd.detectChanges(); // 👈 fuerza la actualización visual
    });
  }

  ionViewWillLeave() {
    if (this.datosSub) {
      this.datosSub.unsubscribe();
    }
  }
}