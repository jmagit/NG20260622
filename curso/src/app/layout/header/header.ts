import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { generaMenu, Option } from 'src/app/app.routes';
import { Login } from "src/app/security";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Login],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menu = signal<Option[]>([])

  constructor() {
    this.actualizaMenu()
    effect(() => {
      this.actualizaMenu()
    })
  }

  actualizaMenu() {
    this.menu.set(generaMenu())
  }
}
