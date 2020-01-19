import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { UploadComponent } from "./components/upload/upload.component";
import { HeaderComponent } from "./components/header/header.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AppRoutingModule } from "./app-routing.module";
import { SlideComponent } from "./components/slide/slide.component";
//import HHTP Cliente para enviar datos al servidor
import { HttpClientModule } from "@angular/common/http";
//Angular MAterial
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule, MatPaginatorModule } from "@angular/material";
import { UploadService } from "./services/upload.service";
import { DatePipe } from "@angular/common";
import { ScannComponent } from './components/scann/scann.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HeaderComponent,
    WelcomeComponent,
    SlideComponent,
    ScannComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [UploadService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
