import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { Encargo } from '../encargo';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  encargoEditando = {} as Encargo;
  arrayColeccionEncargos: any =
    {
      id: '',
      data: {} as Encargo,
    };

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    let idRecibido = this.activatedRoute.snapshot.paramMap.get('id');
    if (idRecibido !== null) {
      this.arrayColeccionEncargos.id = idRecibido;
    } else {
      this.arrayColeccionEncargos.id = '';
    }

    this.firestoreService
      .consultarPorId('encargos', this.arrayColeccionEncargos.id)
      .subscribe((resultado: any) => {
        if (resultado.payload.data() != null) {
          this.arrayColeccionEncargos.id = resultado.payload.id;
          this.arrayColeccionEncargos.data = resultado.payload.data();
        } else {
          this.arrayColeccionEncargos.data = {} as Encargo;
        }
      });
    console.log(this.arrayColeccionEncargos.id);
    console.log(this.arrayColeccionEncargos.data.nombre);
  }
  //Manejo de los encargos una vez se hace click en un encargo de la lista
  //Borrado de la base de datos - Implementado en public alertButtons para mas correcto funcionamiento
  /* 
  clicBotonBorrar() {
    this.firestoreService.borrar("encargos", this.arrayColeccionEncargos.id).then(() => {
      console.log("Encargo borrado correctamente");
      this.arrayColeccionEncargos.id = "";
      this.encargoEditando = {} as Encargo;
    }, (error) => {
      console.error(error);
    });
  }
  */
  //Modificacion de un elemento ya existente en la base de datos
  clickBotonModificar() {
    this.router.navigate(['home']);
    this.firestoreService
      .modificar(
        'encargos',
        this.arrayColeccionEncargos.id,
        this.arrayColeccionEncargos.data
      )
      .then(
        () => {
          console.log('Encargo modificado correctamente');
          this.router.navigate(['home']);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alerta cancelada');
        this.router.navigate(['home']);
      },
    },
    {
      text: 'confirmar',
      role: 'confirm',
      handler: () => {
        // Borrado de la base de datos
        this.firestoreService
          .borrar('encargos', this.arrayColeccionEncargos.id)
          .then(
            () => {
              console.log('Encargo borrado correctamente');
              this.arrayColeccionEncargos.id = '';
              this.encargoEditando = {} as Encargo;
              console.log('Alerta confirmada');
              this.router.navigate(['home']);
            },
            (error) => {
              console.error(error);
            }
          );
      },
    },
  ];
  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
}
