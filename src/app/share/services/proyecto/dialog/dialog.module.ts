import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";

import { FormdialogComponent } from "../formdialog/formdialog.component";
import { DialogComponent } from "./dialog.component";

@NgModule({
    imports: [
      CommonModule,
      MaterialModule
     ],
    entryComponents: [
      DialogComponent
    ], 
    declarations: [
      DialogComponent,
      FormdialogComponent 
    ],
    exports: [
  
    ]
  })
  
  export class DialogModule {}