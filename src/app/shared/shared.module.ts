import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SlideComponent } from "./slide/slide.component";
//modulos
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [HeaderComponent, SlideComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, SlideComponent],
})
export class SharedModule {}
