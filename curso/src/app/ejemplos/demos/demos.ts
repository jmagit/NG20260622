/* eslint-disable @typescript-eslint/no-unused-vars */
<<<<<<< HEAD
import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
=======
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, resource, signal } from '@angular/core';
>>>>>>> d4a51d96695614ef683f298732d8da67c55430ee
import { ERROR_LEVEL, LoggerService } from '@my-library';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { Notification } from "src/app/layout";

@Component({
  selector: 'app-demos',
<<<<<<< HEAD
  imports: [JsonPipe, Notification, CommonModule, FormsModule],
=======
  imports: [JsonPipe, Notification],
>>>>>>> d4a51d96695614ef683f298732d8da67c55430ee
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  // providers: [{ provide: LoggerService, useClass: LoggerService }, { provide: ERROR_LEVEL, useValue: 2 }, NotificationService]
  // changeDetection: ChangeDetectionStrategy.Eager,
})
export class Demos {
  readonly nombre = signal<string>('mundo')
  readonly fontSize = signal(24)
  readonly listado = signal([
    { id: 1, nombre: 'Madrid'},
    { id: 2, nombre: 'barcelona'},
    { id: 3, nombre: 'SEVILLA'},
    { id: 4, nombre: 'ciudad Real'},
  ])
  readonly idProvincia = signal(2)
  readonly total = computed(() => this.listado().length)

  fecha = new Date('2026-06-23')

  public get Fecha(): string { return this.fecha.toISOString().substring(0, 10)}
  public set Fecha(value: string) {
    const f = new Date(value)
    if(f.toString() === 'Invalid date' || f === this.fecha) return
    this.fecha = f
  }

  readonly resultado = signal('')
  readonly visible = signal(true)
  readonly estetica = signal({ importante: true, error: false, urgente: true})

  saluda() {
    this.resultado.set(`Hola ${this.nombre}`)
  }

  despide() {
    this.resultado.set(`Adios ${this.nombre}`)
  }

  di(algo: string) {
    this.resultado.set(`Dice ${algo}`)
  }

  cambia() {
    this.visible.update(value => !value)
    this.estetica.update(value => ({ ... value, importante: !value.importante, error: !value.error }))
  }

  calcula(a: number, b: number) {
    return a + b
  }

  add(provincia: string) {
    const id = this.listado()[this.listado().length].id + 1
    this.listado.update(value => [...value, { id, nombre: provincia}])
    this.idProvincia.set(id)
  }

  // Ejemplo de servicios
  vm = inject(NotificationService)

  // constructor() {
  //   effect(() => {
  //     if (this.vm.HayNotificaciones() && this.vm.Listado()[this.vm.Listado().length - 1].Type === NotificationType.error) {
  //       window.alert(`Efecto: ${this.vm.Listado()[this.vm.Listado().length - 1].Message}`);
  //       this.vm.remove(this.vm.Listado().length - 1);
  //     }
  //   })
  // }

  // private suscriptor: Unsubscribable | undefined;
  // ngOnInit(): void {
  //   this.suscriptor = this.vm.Notificacion.subscribe(n => {
  //     if (n.Type !== NotificationType.error) { return; }
  //     window.alert(`Suscripción: ${n.Message}`);
  //     this.vm.remove(this.vm.Listado().length - 1);
  //   });
  // }
  // ngOnDestroy(): void {
  //   if (this.suscriptor) {
  //     this.suscriptor.unsubscribe();
  //   }
  // }

  // private logger = inject(LoggerService)
  // constructor() {
  //   this.logger.error('esto es un error')
  //   this.logger.warn('esto es un warn')
  //   this.logger.info('esto es un info')
  //   this.logger.log('esto es un log')
  // }

  // ejemplo de señales
  // readonly conSignal = signal(0)
  // readonly doble = computed(() => this.conSignal() * 2)
  // sinSignal = 0

  // intervalos: number[] = []
  // changeDetectorRef = inject(ChangeDetectorRef)
  // constructor() {
  //   this.intervalos.push(setInterval(() => this.conSignal.update(value => value + 1), 3_000))
  //   this.intervalos.push(setInterval(() => {
  //     this.sinSignal++;
  //     console.warn(this.sinSignal)
  //     this.changeDetectorRef.detectChanges()
  //   }, 1_000))
  //   effect(() => {
  //     console.log(`Contador: ${this.conSignal()}`)
  //   })
  // }

  // ngOnDestroy() {
  //   this.intervalos.forEach(intervalo => clearInterval(intervalo))
  // }

  // addSignal() {
  //   this.conSignal.update(value => value + 1)
  // }
  // addSinSignal() {
  //   this.sinSignal++
  // }

  // readonly file = signal<Blob | undefined>(undefined)
  // readonly lector = resource({
  //   params: () => ({ file: this.file() }),
  //   loader: ({ params }) => new Promise((resolve, reject) => {
  //     if (!params.file) reject('Falta el fichero')
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = () => reject(reader.error);
  //     reader.readAsText(params.file as Blob);
  //   })
  // })

}
