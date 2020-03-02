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

  lista(): Observable<any> {
    return this.http.get(Global.URLserverNode + "/obtener/importaciones");
  }
}
