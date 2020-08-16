import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ModalLoginComponent } from "./modal-login.component";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {}

  login() {
    const dialogRef = this.dialog.open(ModalLoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const user = result.user;
      const pwd = result.pwd;
      if (user == "econtrol" && pwd == "econtrol") {
        if (this._usuarioService.login(user)) {
          this.router.navigate(["/uploadExcelLote"]);
        }
      }
    });
  }
}
