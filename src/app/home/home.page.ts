import { Component } from '@angular/core';
import { Encargo } from '../encargo';
import { FirestoreService } from '../firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  constructor(private firestoreService: FirestoreService) {
    this.obtenerListaEncargos();
  }

  clicBotonInsertar() {
    console.log("Entra en clicBotonInsertar");
    this.firestoreService.insertar("encargos", this.encargoEditando).then(() => {
      console.log("Encargo creado correctamente");
      this.encargoEditando = {} as Encargo;
    },
      (error) => {
        console.error(error);
      });
  }

  obtenerListaEncargos() {
    this.firestoreService.consultar("encargos").subscribe((datosRecibidos) => {
      this.arrayColeccionEncargos = [];
      datosRecibidos.forEach((datosEncargo) => {
        this.arrayColeccionEncargos.push({
          id: datosEncargo.payload.doc.id,
          encargo: datosEncargo.payload.doc.data()
        });
      });
    });
  }

  selectEncargo(idEncargo: string, encargoSelect: Encargo) {
    this.encargoEditando = encargoSelect;
    this.idEncargoSelect = idEncargo;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("encargos", this.idEncargoSelect).then(() => {
      console.log("Encargo borrado correctamente");
      this.idEncargoSelect = "";
      this.encargoEditando = {} as Encargo;
    }, (error) => {
      console.error(error);
    });
  }

  clickBotonModificar() {
    this.firestoreService.modificar("encargos", this.idEncargoSelect, this.encargoEditando).then(() => {
      console.log('Encargo modificado correctamente');
    }, (error) => {
      console.error(error);
    });
  }

}