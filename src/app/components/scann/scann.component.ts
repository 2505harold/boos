import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  SimpleChanges
} from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { LoteMedicion } from "src/app/models/lotemedicion";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";
import { RegistrocodigoService } from "src/app/services/registrocodigo.service";
import { Global } from "../../services/global.variables";
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
  inputFind: string;
  inputPrescinto: string;
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
    (function($) {
      $(document).ready(function() {
        $(".codigoMedidor").focus();
      });
    })(jQuery);
  }

  buscar(value: string) {
    //empieza a buscar cuando el codigo es mayor a 11
    if (value.length > 9) {
      this.uploadService.buscar(value, "codigo_medidor").subscribe(
        response => {
          //verificamos si hay algun error
          if (response.status == "ok") {
            //verificamos si el valor devuelto contiene mediciones
            if (response.medicion.length > 0) {
              //verificamos si existe codigo medicion
              if (!response.medicion[0].codigo_prescinto) {
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
                //codigo de prescinto ya existe
                this.inputFind = "";
                Swal.fire({
                  icon: "info",
                  title: "Codigo creado",
                  text:
                    "Se verifica que el medidor ya cuenta con codigo de prescinto ingresado"
                });
              }
            } else {
              //no hay registro de medicion
              this.inputFind = "";
              Swal.fire({
                icon: "info",
                title: "Registro no encontrado",
                text: "No existe el codigo de medidor ingresado"
              });
            }
          } else {
            //existe un error en la base de datos
            console.log(response);
            this.inputFind = "";
            Swal.fire({
              icon: "error",
              title: response.message.code,
              text: response.message.sqlMessage + "." + response.message.sql
            });
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

  guardarCodePrescinto(value: string) {
    //identificamos si el usuario ya ingreso el codigo prescinto
    if (value.length > 7 && value.length < 9) {
      this.uploadService
        .buscar(value, "codigo_prescinto")
        .subscribe(response => {
          //validamos si el codigo de prescinto ya fue utilizado
          if (response.status == "ok") {
            // si nos devuelve un lote vacio  quier decir que el codigo no fue utilizado aun
            if (response.medicion.length == 0) {
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
                    this.form.reset();
                    this.inputFind = "";
                    this.inputBuscar.nativeElement.focus();
                    this.loteMedicion.ensayo_presion = "";
                    this.loteMedicion.estado = "";
                    Swal.fire({
                      icon: "success",
                      title: "Hecho",
                      showConfirmButton: false,
                      timer: 1500,
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
            } else {
              //existe un lote de medicion con el codigo de prescinto ya ingresado
              this.loteMedicion.codigo_prescinto = "";
              Swal.fire({
                icon: "info",
                title: "Codigo repetido",
                showConfirmButton: false,
                timer: 1500,
                text:
                  "codigo de prescinto no puede ser utilizado por segunda vez"
              });
            }
          }
        });
    } else {
      if (value.length > 8) {
        this.loteMedicion.codigo_prescinto = "";
        Swal.fire({
          icon: "info",
          title: "Codigo muy largo",
          text: "El codigo de prescinto no debe ser mayor a 8 digitos"
        });
      }
    }
  }
}
