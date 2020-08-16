import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";

//componentes
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

//import HHTP Cliente para enviar datos al servidor
import { HttpClientModule } from "@angular/common/http";
//Angular MAterial
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//modulos
import { MaterialModule } from "./material/material.module";
import { ServicesModule } from "./services/services.module";
import { PagesModule } from "./pages/pages.module";

//rutas
import { APP_ROUTES } from "./app.routes";
import { ModalLoginComponent } from "./login/modal-login.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, ModalLoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ServicesModule,
    PagesModule,
    APP_ROUTES,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalLoginComponent],
})
export class AppModule {}
