import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Global } from "../services/global.variables";

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  saveDataBase(data): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<any>(Global.URLserverNode + "/upload_lote", data, {
      headers
    });
  }

  buscar(codigo: string, campo: string): Observable<any> {
    return this.http.get(
      Global.URLserverNode + "/buscar/lote/" + codigo + "/" + campo
    );
  }

  lista(): Observable<any> {
    return;
  }

  actualizar(lotemedicion): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<any>(
      Global.URLserverNode + "/actualizar/" + lotemedicion.id,
      lotemedicion,
      {
        headers
      }
    );
  }
}
