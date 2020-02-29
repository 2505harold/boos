import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-detalles-prescinto",
  templateUrl: "./detalles-prescinto.component.html",
  styleUrls: ["./detalles-prescinto.component.css"]
})
export class DetallesPrescintoComponent implements OnInit {
  tituloSlide: string = "Detalle de codigos de apertura";
  subtituloSlide: string =
    "La lista adjunta representa los codigos de apertura generados para el ingreso de los codigos de prescinto de un grupo de valvulas";
  constructor() {}

  ngOnInit() {}
}
