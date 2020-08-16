import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from "./usuario.service";

@Injectable({
  providedIn: "root",
})
export class GuardsGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate() {
    if (this._usuarioService.estaLogeado()) {
      console.log("Esta logeado");
      return true;
    } else {
      console.log("No esta logeado");
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
