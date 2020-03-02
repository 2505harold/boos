import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as XLSX from "xlsx";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material";
import { UploadService } from "src/app/services/upload.service";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { Importacion } from "../../models/importaciones";
import { LoteMedicion } from "src/app/models/lotemedicion";
import { ImportacionesService } from "src/app/services/importaciones.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit {
  importacion: Importacion = new Importacion("", "", "", "");
  @ViewChild("lblFileInput", { static: false }) lblFileInput: ElementRef; //Seleccione archivo
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef; //input del file subido
  msgNoHayDatos = true;
  msgLoadTable = false;
  nameFile: string;
  jsonData: any;
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    "Item",
    "N° de banco de ensayo",
    "# Medidor",
    "Q3 (L/h)",
    "Error Q3 (%)",
    "Q2 (L/h)",
    "Error Q2 (%)",
    "Q1 (L/h)",
    "Error Q1 (%)",
    "Ensayo de presión Estatica",
    "Fecha de ejecución",
    "N° Certificado",
    "Estado"
  ];

  constructor(
    private uploadService: UploadService,
    private datePipe: DatePipe,
    private importacionService: ImportacionesService
  ) {}

  ngOnInit() {}

  guardar() {
    this.uploadService.saveDataBase(this.jsonData).subscribe(
      response => {
        console.log(response);
        if (response.status == "error") {
          Swal.fire({
            icon: "error",
            title: response.message["code"],
            text: response.message["sqlMessage"]
          });
        } else {
          this.importacion.nombre = this.nameFile;
          this.importacion.fecha_subida = this.datePipe.transform(
            new Date(),
            "yyyy/MM/dd hh:mm:ss"
          );
          this.importacionService.guardar(this.importacion).subscribe(
            response => {
              if (response.status == "ok") {
                this.fileInput.nativeElement.value = "";
                this.lblFileInput.nativeElement.innerText =
                  "Seleccione archivo excel";
                this.dataSource = new MatTableDataSource();
                Swal.fire({
                  icon: "success",
                  title: "Hecho",
                  text:
                    "el almacenamiento de los datos se realizo satisfactoriamente"
                });
              } else {
                console.log(response);
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
      },
      error => {
        Swal.fire({
          icon: "error",
          title: error.statusText,
          text: error.message
        });
      }
    );
  }

  onFileChange(event) {
    this.msgNoHayDatos = false;
    this.msgLoadTable = true;
    let workbook = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    this.nameFile = file.name.substring(0, file.name.indexOf(".xls"));
    reader.onload = event => {
      const data = reader.result;
      workbook = XLSX.read(data, {
        type: "binary",
        cellDates: true,
        cellText: false,
        cellNF: false,
        dateNF: "yyyy/mm/dd;@"
      });
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var range = XLSX.utils.decode_range(worksheet["!ref"]);

      var cell_codigo = XLSX.utils.encode_cell({ c: 11, r: 1 }); // --> capturamos el valor de la celda para obtener el codigo
      console.log(worksheet[cell_codigo].v); //obtenemos el valor de una celda por su codigo
      range.s.r = 7; // <-- indicamos la fila en la cual esta los encabezados de los medidores y las mediciones
      worksheet["!ref"] = XLSX.utils.encode_range(range); //<-- actualizamos el rango de la tabla

      this.lblFileInput.nativeElement.innerText = file.name; //input con el nombre del archivo subido
      this.jsonData = XLSX.utils.sheet_to_json(worksheet);

      //convertimos el formato de las fechas
      this.jsonData.forEach(element => {
        element["Fecha de ejecución"] = this.datePipe.transform(
          element["Fecha de ejecución"],
          "yyyy-MM-dd"
        );
        element["nombre file"] = this.nameFile;
        if (element["Q3 (L/h)"] === "-") {
          element["Q3 (L/h)"] = 0;
          element["Error Q3 (%)"] = 0;
        }
        if (element["Q2 (L/h)"] === "-") {
          element["Q2 (L/h)"] = 0;
          element["Error Q2 (%)"] = 0;
        }
        if (element["Q1 (L/h)"] === "-") {
          element["Q1 (L/h)"] = 0;
          element["Error Q1 (%)"] = 0;
        }
      });

      this.dataSource = new MatTableDataSource(this.jsonData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.msgLoadTable = false;
    };
    reader.readAsBinaryString(file);
  }
}
