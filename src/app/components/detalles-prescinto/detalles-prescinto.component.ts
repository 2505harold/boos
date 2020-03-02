import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ImportacionesService } from "src/app/services/importaciones.service";
import Swal from "sweetalert2";
import { UploadService } from "src/app/services/upload.service";
import { ExcelService } from "src/app/services/excel.service";
import { EstadoLoteService } from "src/app/services/estado-lote.service";

@Component({
  selector: "app-detalles-prescinto",
  templateUrl: "./detalles-prescinto.component.html",
  styleUrls: ["./detalles-prescinto.component.css"]
})
export class DetallesPrescintoComponent implements OnInit {
  tituloSlide: string = "Lista de archivos importados";
  subtituloSlide: string =
    "La lista representa el detalle de los archivos excel importados";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    "nombre",
    "fecha_subida",
    "conforme",
    "noconforme",
    "accion"
  ];
  msgNoHayDatos = false;
  hideMsgLoadTable = false;
  dataSource: any;

  constructor(
    private importacionesService: ImportacionesService,
    private uploadService: UploadService,
    private excelService: ExcelService,
    private contarEstado: EstadoLoteService
  ) {}

  ngAfterViewInit(): void {}

  descargar(row) {
    this.uploadService.buscar(row.nombre, "nombre_file").subscribe(
      response => {
        delete response.medicion["id"];
        this.excelService.exportAsExcelFile(response.medicion, "lote_medicion");
        Swal.fire({
          icon: "success",
          title: "Hecho",
          text: "se realizo la descarga satisfactoriamente"
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    //this.msgLoadTable = true;
    this.importacionesService.lista().subscribe(
      response => {
        if (response.status == "ok") {
          this.dataSource = new MatTableDataSource(response.importaciones);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //this.msgLoadTable = false;
        } else {
          Swal.fire({
            icon: "error",
            title: response.message.sqlMessage,
            text: response.message.sql
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
