import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { LoteMedicion } from "src/app/models/lotemedicion";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";
import { RegistrocodigoService } from "src/app/services/registrocodigo.service";
import { Router } from "@angular/router";

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
    "",
    ""
  );
  subtituloSlide: string =
    "Pase el lector de barras sobre el codigo e inmediatamente pase sobre el codigo del prescinto para su ingreso";

  constructor(
    private uploadService: UploadService,
    private datePipe: DatePipe,
    private registrocodigoService: RegistrocodigoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrocodigoService.obtenerUltimoId().subscribe(
      response => {
        if (response.id) {
          this.registrocodigoService
            .obtenerRegistroPorId(response.id)
            .subscribe(response => {
              const codigo = response.registro[0].codigo_apertura;
              let codigo_generado = this.registrocodigoService.generarNumeroRegistro(
                codigo
              );
              this.codigoRegistro.nativeElement.innerText = codigo_generado;
              //almacenamos
              this.registrocodigoService
                .guardarCodigoRegistro({
                  codigo_apertura: codigo_generado,
                  fecha_apertura: this.datePipe.transform(
                    new Date(),
                    "yyyy-MM-dd hh:mm:ss"
                  )
                })
                .subscribe(
                  response => {
                    console.log(response.message);
                  },
                  error => {
                    console.log(error);
                  }
                );
            });
        } else {
          //insertamos en el HTML el codigo
          this.codigoRegistro.nativeElement.innerText =
            new Date().getFullYear() + "-0000";
          //almacenamos
          this.registrocodigoService
            .guardarCodigoRegistro({
              codigo_apertura: new Date().getFullYear() + "-0000",
              fecha_apertura: this.datePipe.transform(
                new Date(),
                "yyyy-MM-dd hh:mm:ss"
              )
            })
            .subscribe(
              response => {
                console.log(response.message);
              },
              error => {
                console.log(error);
              }
            );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.numeroScan.nativeElement.innerText = 0;
    this.inputBuscar.nativeElement.focus();
  }

  nuevoRegistro() {
    this.registrocodigoService
      .cerrarRegistro({
        codigo_registro: this.codigoRegistro.nativeElement.innerText,
        fecha_cierre: this.datePipe.transform(new Date(), "yyyy-MM-dd hh:mm:ss")
      })
      .subscribe(
        resp => {
          this.form.reset();
          this.inputBuscar.nativeElement.value = "";
          this.inputBuscar.nativeElement.focus();
          this.loteMedicion.ensayo_presion = "";
          this.loteMedicion.estado = "";
          this.numeroScan.nativeElement.innerText = 0;
          const numero_registro = this.registrocodigoService.generarNumeroRegistro(
            this.codigoRegistro.nativeElement.innerText
          );
          this.codigoRegistro.nativeElement.innerText = numero_registro;
          this.registrocodigoService
            .guardarCodigoRegistro({
              codigo_apertura: numero_registro,
              fecha_apertura: this.datePipe.transform(
                new Date(),
                "yyyy-MM-dd hh:mm:ss"
              )
            })
            .subscribe(
              response => {
                Swal.fire({
                  icon: "success",
                  title: "Hecho",
                  text:
                    "El numero registro fue almacenado. Y se procede a abrir un nuevo numero de registro"
                });
              },
              error => {
                console.log(error);
              }
            );
        },
        err => {
          console.log(err);
        }
      );
  }

  buscar(value) {
    if (value != "") {
      this.numeroScan.nativeElement.innerText =
        parseInt(this.numeroScan.nativeElement.innerText) + 1;
      this.uploadService.buscarCodigoMedidor(value).subscribe(
        response => {
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
      this.loteMedicion.numero_registro = this.codigoRegistro.nativeElement.innerText;
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
