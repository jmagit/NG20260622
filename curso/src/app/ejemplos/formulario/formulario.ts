import { AsyncPipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { HttpContext, httpResource } from '@angular/common/http';
import { Component, inject, Service, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessagePipe, NIFNIEValidator, NotblankValidator, TypeValidator, UppercaseValidator } from '@my-library';
import { NotificationService } from 'src/app/common-services';
import { RESTDAOService } from 'src/app/core';
import { AUTH_REQUIRED } from 'src/app/security';

type Mode = 'add' | 'edit'

interface Persona {
  id: number
  nombre: string
  apellidos?: string
  edad?: number
  correo?: string
  nif?: string
}

const INIT_VALUE: Persona = {
  id: 0,
  nombre: ''
}

@Service()
class PersonasDAOService extends RESTDAOService<Persona, number> {
  constructor() {
    super('personas', { context: new HttpContext().set(AUTH_REQUIRED, true) })
  }
}
@Service()
class LibrosDAOService extends RESTDAOService<Persona, number> {
  constructor() {
    super('libros', { context: new HttpContext().set(AUTH_REQUIRED, true) })
  }
}

@Service()
class PersonaViewModelService {
  private notify = inject(NotificationService)
  private dao = inject(PersonasDAOService)

  Modo = signal<Mode>('add')
  Elemento = signal<Persona>({...INIT_VALUE})

  add() {
    this.Elemento.set({...INIT_VALUE})
    this.Modo.set('add')
  }

  edit(key: number) {
    this.dao.get(key).subscribe({
      next: data => {
        this.Elemento.set(data)
        this.Modo.set('edit')
      },
      error: err => this.notify.add(err.message)
    })
    // this.Elemento.set({id: key, nombre:'Pepito', apellidos: 'Grillo', edad: 99, correo: 'pgrillo@example.com', nif: '12345678z'})
    // this.Modo.set('edit')
  }

  cancel() {
    this.Elemento.set({...INIT_VALUE})
  }

  send() {
    switch(this.Modo()) {
      case 'add':
        this.dao.add(this.Elemento()).subscribe({
          next: () => this.cancel(),
          error: err => this.notify.add(err.message),
        })
        // this.notify.add(`POST: ${JSON.stringify(this.Elemento())}`)
        // this.cancel()
        break;
      case 'edit':
        this.dao.change(this.Elemento().id, this.Elemento()).subscribe({
          next: () => this.cancel(),
          error: err => this.notify.add(err.message),
        })
        // this.notify.add(`PUT: ${JSON.stringify(this.Elemento())}`)
        // this.cancel()
        break;
    }
  }
}

@Component({
  selector: 'app-formulario',
  imports: [FormsModule, ErrorMessagePipe, TypeValidator, NIFNIEValidator, NotblankValidator, UpperCasePipe, UppercaseValidator,
    JsonPipe, AsyncPipe],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  vm = inject(PersonaViewModelService)

  dao = inject(LibrosDAOService)
  private notify = inject(NotificationService)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listado = signal<any[]>([])
  carga() {
    this.dao.query().subscribe({
      next: data => this.listado.set(data),
      error: err => this.notify.add(err.message),
    })
  }
  id = signal<number>(1)
  readonly recurso = httpResource(() => `/api/peliculas/${this.id()}`)
}
