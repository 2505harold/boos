import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SlideComponent } from "./slide/slide.component";
//modulos
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [HeaderComponent, SlideComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HeaderComponent, SlideComponent],
})
export class SharedModule {}
