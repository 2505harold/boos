import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  usuario: any = [];

  constructor(public router: Router) {
    this.leerStorage();
  }

  guardarStorage(user: string) {
    this.usuario.user = user;
    localStorage.setItem("user", user);
  }

  leerStorage() {
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      this.usuario.user = localStorage.getItem("user");
    } else {
      this.usuario.user = "";
    }
  }

  login(user: string) {
    this.guardarStorage(user);
    return true;
  }
  logout() {
    this.usuario = [];
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  estaLogeado() {
    return this.usuario.user ? true : false;
  }
}
