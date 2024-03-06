import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { Encargo } from '../encargo';
import { Route, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  imagenSelec: string = '';

  encargoEditando = {} as Encargo;

  esNuevo: boolean = false;

  arrayColeccionEncargos: any = {
    id: '',
    data: {} as Encargo,
  };

  existeEncargo: boolean = true

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private imagePicker: ImagePicker,
    private socialSharing: SocialSharing,
    private callNumber: CallNumber
  ) {}

  ngOnInit() {
    let idRecibido = this.activatedRoute.snapshot.paramMap.get('id');
    if (idRecibido !== null) {
      console.log(this.arrayColeccionEncargos);
      console.log(idRecibido);
      this.arrayColeccionEncargos.id = idRecibido;
      this.obtenerDetalles();
    } else {
      this.arrayColeccionEncargos.id = '';
    }

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

  obtenerDetalles() {
    this.firestoreService
      .consultarPorId('encargos', this.arrayColeccionEncargos.id)
      .subscribe((resultado: any) => {
        if (resultado.payload.data() != null) {
          console.log('entra en obtener detalles');
          this.arrayColeccionEncargos.id = resultado.payload.id;
          this.arrayColeccionEncargos.data = resultado.payload.data();
          this.existeEncargo = true;
        } else {
          this.arrayColeccionEncargos.data = {} as Encargo;
          this.existeEncargo = false;
        }
      });
  }

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
  clicBotonInsertar() {
    console.log('Entra en clicBotonInsertar');
    this.firestoreService.insertar('encargos', this.arrayColeccionEncargos.data).then(
      () => {
        console.log('Encargo creado correctamente');
        this.arrayColeccionEncargos.data = {} as Encargo;
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
  async seleccionarImagen() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          this.imagePicker.requestReadPermission();
        } else {
          this.imagePicker
            .getPictures({
              maximumImagesCount: 1,
              outputType: 1,
            })
            .then(
              (results) => {
                if (results.length > 0) {
                  this.imagenSelec = 'data:image/jpeg;base64,' + results[0];
                  console.log(
                    'Imagen que se ha seleccionado (en base64) ' +
                      this.imagenSelec
                  );
                }
              },
              (err) => {
                console.log(err);
              }
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async subirImagen() {
    const loading = await this.loadingController.create({
      message: 'Please wait..',
    });

    const toast = await this.toastController.create({
      message: 'Image was updated successfully',
      duration: 3000,
    });

    let nombreCarpeta = 'imagenes';
    loading.present();

    let nombreImagen = `${new Date().getTime()}`;

    this.firestoreService
      .subirImagenBase64(nombreCarpeta, nombreImagen, this.imagenSelec)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('downloadURL:' + downloadURL);
          toast.present();
          loading.dismiss();
        });
      });
  }
  async eliminarArchivo(fileURL: string) {
    const toast = await this.toastController.create({
      message: 'File was deleted successfully',
      duration: 3000,
    });
    this.firestoreService.eliminarArchivoPorURL(fileURL).then(
      () => {
        toast.present();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  clickSocialShare() {
    this.socialSharing
      .share(
        this.arrayColeccionEncargos.data.nombre,
        this.arrayColeccionEncargos.data.estado
      )
      .then(() => {
        console.log('Compartido correctamente');
      })
      .catch((error) => {
        console.error('Error al compartir', error);
      });
  }
  callSomeone() {
    this.callNumber.callNumber(this.arrayColeccionEncargos.data.numeroResponsable, true)
      .then(() => console.log('Se ha realizado la llamada'))
      .catch(() => console.log('Error al lanzar la llamada'));
  }

}
