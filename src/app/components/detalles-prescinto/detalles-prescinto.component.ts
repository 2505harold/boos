import { Component, OnInit, ViewChild } from "@angular/core";
import { RegistrocodigoService } from "src/app/services/registrocodigo.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-detalles-prescinto",
  templateUrl: "./detalles-prescinto.component.html",
  styleUrls: ["./detalles-prescinto.component.css"]
})
export class DetallesPrescintoComponent implements OnInit {
  tituloSlide: string = "Detalle de codigos de apertura";
  subtituloSlide: string =
    "La lista adjunta representa los codigos de apertura generados para el ingreso de los codigos de prescinto de un grupo de valvulas";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ["codigo_apertura", "fecha_apertura", "accion"];
  dataSource: any;

  constructor(private registroCodigoService: RegistrocodigoService) {}

  ngOnInit() {
    this.registroCodigoService.obtenerListaNumerosRegistro().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response.registros);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(response.registros);
      },
      error => {
        console.log(error);
      }
    );
  }
}
