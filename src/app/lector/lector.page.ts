import { Component, AfterViewInit } from '@angular/core';
import { BluetoothDataService } from '../services/bluetooth-data.service';
import { EstadoMetabolico } from '../Interface/estado-metabolico.model';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-lector',
  templateUrl: './lector.page.html',
  styleUrls: ['./lector.page.scss'],
  standalone: false,
})
export class LectorPage implements AfterViewInit {
  datos: EstadoMetabolico | null = null;
  private datosSub!: Subscription;
  private map!: mapboxgl.Map;

  constructor(
    private bluetoothDataService: BluetoothDataService,
    private cd: ChangeDetectorRef
  ) { }

  ionViewWillEnter() {
    this.datosSub = this.bluetoothDataService.datos$.subscribe((data) => {
      this.datos = data;
      this.cd.detectChanges(); // fuerza la actualización visual
    });
  }

  ionViewWillLeave() {
    if (this.datosSub) {
      this.datosSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoiamFuZHJ5MjAxNCIsImEiOiJjbWQzZHhvNDAwM3Q5Mm1vczYxYzFzNjZ1In0.Gzi_7-H0SvPK1CbvxjRT5A';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.970118, -2.898698], // Centro aproximado de Cuenca
      zoom: 13
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    // Hospitales en Cuenca
    const hospitales = [
      {
        nombre: 'Hospital Vicente Corral Moscoso',
        coords: [-78.99237, -2.91113],
        telefono: '(07) 409 6006'
      },
      {
        nombre: 'Hospital José Carrasco Arteaga (IESS)',
        coords: [-78.970118, -2.898698],
        telefono: '(07) 286 1500'
      },
      {
        nombre: 'Hospital Universitario del Río',
        coords: [-78.9607957, -2.8929386],
        telefono:
          'Hospitalización: (07) 245 9555\nConsultorios: (07) 245 9553\nAmbulancia: 0984 362 936\nLaboratorio: 0998 127 539\nImágenes: 0992 798 000'
      }
    ];

    // Agregar marcadores
    hospitales.forEach((hospital) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="color: black; font-weight: 500;">
          <strong>${hospital.nombre}</strong><br/>
          📍 Coordenadas: [${hospital.coords[0]}, ${hospital.coords[1]}]<br/>
          📞 ${hospital.telefono.replace(/\n/g, '<br/>')}
        </div>`
      );

      const marker = document.createElement('div');
      marker.style.backgroundColor = 'red';
      marker.style.width = '15px';
      marker.style.height = '15px';
      marker.style.borderRadius = '50%';
      marker.style.border = '2px solid white';
      marker.style.boxShadow = '0 0 6px rgba(0,0,0,0.4)';

      new mapboxgl.Marker(marker)
        .setLngLat(hospital.coords as [number, number])
        .setPopup(popup)
        .addTo(this.map);
    });
  }
}
