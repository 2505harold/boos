import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EstadoLoteService } from "./estado-lote.service";
import { ExcelService } from "./excel.service";
import { ImportacionesService } from "./importaciones.service";
import { RegistrocodigoService } from "./registrocodigo.service";
import { UploadService } from "./upload.service";
import { UsuarioService } from "./usuario.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    EstadoLoteService,
    ExcelService,
    ImportacionesService,
    RegistrocodigoService,
    UploadService,
    UsuarioService,
  ],
})
export class ServicesModule {}
