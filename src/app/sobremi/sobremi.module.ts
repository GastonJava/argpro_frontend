import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileUpdateModule } from "../share/services/input file/file-update/file-update.module";
import { SharedModule } from "../shared.module";

import { SobremiComponent } from "./component/sobremi.component";


@NgModule({
    imports: [
      CommonModule,
      SharedModule,
    ],
    declarations: [SobremiComponent],
    exports: [
      SobremiComponent
    ]
  })
  export class SobremiModule { }
  