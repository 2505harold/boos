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

}
