import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";

//componentes
import { AppComponent } from "./app.component";
import { UploadComponent } from "./components/upload/upload.component";
import { HeaderComponent } from "./components/header/header.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AppRoutingModule } from "./app-routing.module";
import { SlideComponent } from "./components/slide/slide.component";
import { ScannComponent } from "./components/scann/scann.component";
import { DetallesPrescintoComponent } from "./components/detalles-prescinto/detalles-prescinto.component";
//service users
import { ImportacionesService } from "./services/importaciones.service";
import { RegistrocodigoService } from "./services/registrocodigo.service";
import { UploadService } from "./services/upload.service";
import { ExcelService } from "./services/excel.service";
import { EstadoLoteService } from "./services/estado-lote.service";

//import HHTP Cliente para enviar datos al servidor
import { HttpClientModule } from "@angular/common/http";
//Angular MAterial
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatTableModule,
  MatPaginatorModule,
  MatIconModule
} from "@angular/material";

import { DatePipe, DecimalPipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HeaderComponent,
    WelcomeComponent,
    SlideComponent,
    ScannComponent,
    DetallesPrescintoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    UploadService,
    DatePipe,
    DecimalPipe,
    RegistrocodigoService,
    ImportacionesService,
    ExcelService,
    EstadoLoteService,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
