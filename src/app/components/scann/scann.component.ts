import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { LoteMedicion } from "src/app/models/lotemedicion";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-scann",
  templateUrl: "./scann.component.html",
  styleUrls: ["./scann.component.css"]
})
export class ScannComponent implements OnInit {
  @ViewChild("inputBuscar", { static: false }) inputBuscar: ElementRef;
  @ViewChild("inputCodigoPrescinto", { static: false })
  inputCodigoPrescinto: ElementRef;
  tituloSlide: string = "Portal para ingresar codigo de Prescinto";
  loteMedicion: LoteMedicion = new LoteMedicion(
    0,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  );
  subtituloSlide: string =
    "Pase el lector de barras sobre el codigo e inmediatamente pase sobre el codigo del prescinto para su ingreso";

  constructor(
    private uploadService: UploadService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {}

  buscar(value) {
    if (value != "") {
      this.uploadService.buscarCodigoMedidor(value).subscribe(
        response => {
          if (response.medicion.length > 0) {
            this.loteMedicion = response.medicion[0];
            console.log(this.loteMedicion);
            this.loteMedicion.fecha_ejecucion = this.datePipe.transform(
              this.loteMedicion.fecha_ejecucion,
              "yyyy/MM/dd"
            );
            if (
              !this.loteMedicion.codigo_prescinto ||
              this.loteMedicion.codigo_prescinto != ""
            ) {
              this.inputCodigoPrescinto.nativeElement.focus();
            }
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: error.status + "\n" + error.statusText,
            text: error.url
          });
        }
      );
    }
  }

  guardarCodePrescinto(value) {
    if (value != "") {
      this.loteMedicion.codigo_prescinto = value;
      this.uploadService.actualizar(this.loteMedicion).subscribe(
        response => {
          if (response.status == "error") {
            Swal.fire({
              icon: "error",
              title: response.message["code"],
              text: response.message["sqlMessage"]
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Hecho",
              text:
                "el almacenamiento de los datos se realizo satisfactoriamente"
            });
          }
        },
        error => {
          Swal.fire({
            icon: "error",
            title: error.status,
            text: error.message
          });
        }
      );
    }
  }
}
