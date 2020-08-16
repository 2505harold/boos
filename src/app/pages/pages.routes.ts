import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { UploadComponent } from "./upload/upload.component";
import { ScannComponent } from "./scann/scann.component";
import { DetallesPrescintoComponent } from "./detalles-prescinto/detalles-prescinto.component";
import { GuardsGuard } from "../services/guards.guard";

const pagesRoute: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [GuardsGuard],
    children: [
      { path: "uploadExcelLote", component: UploadComponent },
      { path: "ingresarCodigoPrescinto", component: ScannComponent },
      {
        path: "detallesCodigoPrescinto",
        component: DetallesPrescintoComponent,
      },
      { path: "", redirectTo: "uploadExcelLote", pathMatch: "full" },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoute);
