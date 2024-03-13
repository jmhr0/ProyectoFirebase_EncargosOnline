import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.page.html',
  styleUrls: ['./informacion-general.page.scss'],
})
export class InformacionGeneralPage implements OnInit {
  
  map: L.Map;
  marker1: L.Marker;
  marker2: L.Marker;

  constructor() {
    this.map = {} as L.Map;
    this.marker1 = {} as L.Marker;
    this.marker2 = {} as L.Marker;
   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    let latitud = 36.679628;
    let longitud = -5.444786;
    let zoom = 17;
    this.map = L.map("mapId").setView([latitud, longitud], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    
    this.marker1 = L.marker([latitud, longitud]).addTo(this.map)
                  .bindPopup('Lugar de trabajo')
                  .openPopup();
    
    let latitudVillamartin = 36.874996;
    let longitudVillamartin = -5.599932;
    this.marker2 = L.marker([latitudVillamartin, longitudVillamartin]).addTo(this.map)
                  .bindPopup('Sede de la empresa');
  }
}
