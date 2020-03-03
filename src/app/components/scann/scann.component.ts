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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes["inputBuscar"].currentValue);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  ngOnInit() {
    (function($) {
      $(document).ready(function() {
        $(".codigoMedidor").focus();
      });
    })(jQuery);
  }

  ngAfterViewInit(): void {
    this.inputBuscar.nativeElement.focus();
  }

  buscar(event) {
    const value = event.clipboardData.getData("text");
    console.log(value);
    if (value.length > 9) {
      this.uploadService.buscar(value, "codigo_medidor").subscribe(
        response => {
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

  guardarCodePrescinto(event) {
    if (this.loteMedicion.codigo_prescinto != "") {
      const value = event.clipboardData.getData("text");
      if (value.length > 1 && value.length < 9) {
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Codigo no permitido",
          text: "La longitud del codigo tiene que estar entre 1 a 8 digitos"
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Orden de ingreso de datos",
        text: "Primero tiene que ingresar el codigo del medidor"
      });
    }
  }
}
