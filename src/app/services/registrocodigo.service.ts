import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "../services/global.variables";

@Injectable()
export class RegistrocodigoService {
  constructor(private http: HttpClient) {}
  private result;
  obtenerUltimoId(): Observable<any> {
    return this.http.get(Global.URLserverNode + "/ultimoid/registro");
  }

  obtenerRegistroPorId(id): Observable<any> {
    return this.http.get(Global.URLserverNode + "/buscar/registro/" + id);
  }

  guardarCodigoRegistro(data): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<any>(
      Global.URLserverNode + "/guardar/codigo/registro",
      data,
      { headers }
    );
  }

  cerrarRegistro(data): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<any>(Global.URLserverNode + "/cerrar/registro", data, {
      headers
    });
  }

  obtenerListaNumerosRegistro(): Observable<any> {
    return this.http.get(Global.URLserverNode + "/lista/registro");
  }

  generarNumeroRegistro(codigo) {
    let codigo_generado;
    if (codigo.substring(0, codigo.indexOf("-")) == new Date().getFullYear()) {
      const numero_actual = parseInt(codigo.substring(5));
      const numero_sig = numero_actual + 1;
      const numero_ceros =
        codigo.substring(5).length - numero_sig.toString().length;

      switch (numero_ceros) {
        case 3:
          return new Date().getFullYear() + "-000" + numero_sig;
          break;
        case 2:
          return new Date().getFullYear() + "-00" + numero_sig;
          break;
        case 1:
          return new Date().getFullYear() + "-0" + numero_sig;
          break;
        case 0:
          return new Date().getFullYear() + "-" + numero_sig;
          break;
      }
    } else {
      return new Date().getFullYear() + "-0000";
    }
  }
}
