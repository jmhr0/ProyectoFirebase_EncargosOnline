import { Component } from '@angular/core';
import { Encargo } from '../encargo';
import { FirestoreService } from '../firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  encargoEditando = {} as Encargo;
  arrayColeccionEncargos: any = [{
    id: "",
    encargo: {} as Encargo
  }];
  idEncargoSelect: string = "";
  // Variable para gestionar el filtro del encargo
  filtroEstado: string = "";

  constructor(private firestoreService: FirestoreService, private router: Router) {
    this.obtenerListaEncargos();
  }

  //Se vuelve a renderizar la lista de encargos cuando se aplica el filtro
  aplicarFiltro() {
    this.obtenerListaEncargos();
  }
    //Funcion para la insercion en la base de datos

  //Funcion para obtener la informacion de la base de datos
  obtenerListaEncargos() {
    this.firestoreService.consultar("encargos").subscribe((datosRecibidos) => {
      this.arrayColeccionEncargos = [];
      datosRecibidos.forEach((datosEncargo) => {
        const encargo = datosEncargo.payload.doc.data() as Encargo;
  
        // operaciones de Filtrado para los encargos
        if (!this.filtroEstado || encargo.estado === this.filtroEstado) {
          this.arrayColeccionEncargos.push({
            id: datosEncargo.payload.doc.id,
            encargo: encargo
          });
        }
      });
    });
  }
  //Manejo de los encargos una vez se hace click en un encargo de la lista
  selectEncargo(idEncargo: string, encargoSelect: Encargo) {
    this.encargoEditando = encargoSelect;
    this.idEncargoSelect = idEncargo;
    this.router.navigate(['detalles',this.idEncargoSelect])
  }
    //Borrado de la base de datos
  clicBotonBorrar() {
    this.firestoreService.borrar("encargos", this.idEncargoSelect).then(() => {
      console.log("Encargo borrado correctamente");
      this.idEncargoSelect = "";
      this.encargoEditando = {} as Encargo;
    }, (error) => {
      console.error(error);
    });
  }
  //Modificacion de un elemento ya existente en la base de datos
  clickBotonModificar() {
    this.firestoreService.modificar("encargos", this.idEncargoSelect, this.encargoEditando).then(() => {
      console.log('Encargo modificado correctamente');
    }, (error) => {
      console.error(error);
    });
  }

  clickAddEncargo() {
    this.router.navigate(['detalles','nuevo']);
  }

}