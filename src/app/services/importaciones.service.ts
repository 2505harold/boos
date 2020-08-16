import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "../services/global.variables";
import { GuardsCheckStart } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class ImportacionesService {
  constructor(private http: HttpClient) {}

  guardar(data): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<any>(
      Global.URLserverNode + "/guardar/importacion",
      data,
      { headers }
    );
  }
  buscar(valor: string, campo: string): Observable<any> {
    return this.http.get(
      Global.URLserverNode + "/buscar/importacion/" + valor + "/" + campo
    );
  }
  eliminar(name): Observable<any> {
    return this.http.delete(
      Global.URLserverNode + "/eliminar/importacion/" + name
    );
  }

  lista(): Observable<any> {
    return this.http.get(Global.URLserverNode + "/obtener/importaciones");
  }
}
