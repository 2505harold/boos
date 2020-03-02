import { Injectable } from "@angular/core";
import { UploadService } from "./upload.service";

@Injectable()
export class EstadoLoteService {
  constructor(private uploadService: UploadService) {}

  public contarEstado(nombre_file: string, estado: string) {
    var filter;
    var count;
    this.uploadService
      .buscar(nombre_file, "nombre_file")
      .subscribe(response => {
        console.log(response);
        if (response.status == "ok") {
          filter = response.medicion.filter(function(a) {
            return a.estado === estado;
          });
          count = filter.length;
        }
      });
  }
}
