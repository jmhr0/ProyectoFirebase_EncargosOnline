import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.page.html',
  styleUrls: ['./informacion-general.page.scss'],
})
export class InformacionGeneralPage implements OnInit {
  
  map: any;
  marker:any;

  constructor() {
    this.map = {}  as L.Map;
    this.marker = {}  as L.Marker;
   }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap() {
    let latitud = 36.6797047;
    let longitud = -5.4470656;
    let zoom = 17;
    this.map = L.map("mapId").setView([latitud, longitud], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(this.map);

        const markPoint = L.marker([latitud, longitud]);
        markPoint.bindPopup('<p>Ntra. Sra. de los Remedios - Ubrique.</p>');
        this.map.addLayer(markPoint);
        this.map.dragging.enable();
      }
      
}
