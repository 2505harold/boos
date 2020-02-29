import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { UploadComponent } from "./components/upload/upload.component";
import { ScannComponent } from "./components/scann/scann.component";
import { DetallesPrescintoComponent } from "./components/detalles-prescinto/detalles-prescinto.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "uploadExcelLote", component: UploadComponent },
  { path: "ingresarCodigoPrescinto", component: ScannComponent },
  { path: "detallesCodigoPrescinto", component: DetallesPrescintoComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
