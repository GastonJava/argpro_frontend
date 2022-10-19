import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { FileuploadModule } from "src/app/share/services/input file/file-upload/fileupload.module";
import { SharedModule } from "src/app/shared.module";
import { CrearComponent } from "./component/crear.component";

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      MaterialModule,
      //FileuploadModule
    ],
    declarations: [CrearComponent],
    exports: []
  })
  export class CrearModule { }
  