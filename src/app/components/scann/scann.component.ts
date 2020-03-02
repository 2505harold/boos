import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { LoteMedicion } from "src/app/models/lotemedicion";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";
import { RegistrocodigoService } from "src/app/services/registrocodigo.service";
declare var jQuery: any;

@Component({
  selector: "app-scann",
  templateUrl: "./scann.component.html",
  styleUrls: ["./scann.component.css"]
})
export class ScannComponent implements OnInit {
  @ViewChild("inputBuscar", { static: false }) inputBuscar: ElementRef;
  @ViewChild("inputCodigoPrescinto", { static: false })
  inputCodigoPrescinto: ElementRef;
  @ViewChild("numberScan", { static: false }) numeroScan: ElementRef;
  @ViewChild("codigoRegistro", { static: false }) codigoRegistro: ElementRef;
  @ViewChild("form", { static: false }) form: NgForm;
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

  ngOnInit() {
    // (function($) {
    //   $(document).ready(function() {
    //     $("body .codigoMedidor").change(function() {
    //       $.ajax({
    //         type: "GET",
    //         url:
    //           Global.URLserverNode +
    //           "/buscar/lote/" +
    //           $(this).val() +
    //           "/codigo_medidor",
    //         data: "{}",
    //         contentType: "application/json; charset=utf-8",
    //         dataType: "json",
    //         success: function(result) {
    //           console.log(result);
    //         },
    //         error: function(msg) {
    //           alert(msg.responseText);
    //         }
    //       });
    //     });
    //   });
    // })(jQuery);
  }

  ngAfterViewInit(): void {
    this.inputBuscar.nativeElement.focus();
  }

  onPaste(event: ClipboardEvent) {
    console.log(event.clipboardData.getData("text"));
  }

  buscar(value) {
    console.log(parseInt(value));
    if (value.length > 9) {
      this.uploadService.buscar(value, "codigo_medidor").subscribe(
        response => {
          console.log(response);
          if (response.status == "ok") {
            if (response.medicion.length > 0) {
              this.loteMedicion = response.medicion[0];
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
            } else {
              console.log(response);
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Codigo no permitido",
        text: "La longitud del codigo tiene que ser mayor a 10 digitos"
      });
    }
  }

  guardarCodePrescinto(value) {
    if (value != "") {
      this.loteMedicion.codigo_prescinto = value;
      //this.loteMedicion.numero_registro = this.codigoRegistro.nativeElement.innerText;
      this.uploadService.actualizar(this.loteMedicion).subscribe(
        response => {
          if (response.status == "error") {
            Swal.fire({
              icon: "error",
              title: response.message["code"],
              text: response.message["sqlMessage"]
            });
          } else {
            //Si no hay error
            this.form.reset();
            this.inputBuscar.nativeElement.value = "";
            this.inputBuscar.nativeElement.focus();
            this.loteMedicion.ensayo_presion = "";
            this.loteMedicion.estado = "";
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
