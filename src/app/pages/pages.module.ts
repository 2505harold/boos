import { NgModule } from "@angular/core";
import { CommonModule, DatePipe, DecimalPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
//compoenentes
import { DetallesPrescintoComponent } from "./detalles-prescinto/detalles-prescinto.component";
import { ScannComponent } from "./scann/scann.component";
import { UploadComponent } from "./upload/upload.component";
import { PagesComponent } from "./pages.component";
//Otros Modulos
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//rutas
import { PAGES_ROUTES } from "./pages.routes";

@NgModule({
  declarations: [
    DetallesPrescintoComponent,
    ScannComponent,
    UploadComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe, DecimalPipe],
})
export class PagesModule {}
