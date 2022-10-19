import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FileDeleteModule } from "./share/services/input file/file-delete/filedelete.module";
import { FileUpdateModule } from "./share/services/input file/file-update/file-update.module";
import { FileuploadModule } from "./share/services/input file/file-upload/fileupload.module";
import { ObserverinputModule } from "./share/services/observerinput/observerinput.module";

@NgModule({
    imports: [
    // Leave this blank
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FileuploadModule,
        FileUpdateModule,
        FileDeleteModule,
        ObserverinputModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FileuploadModule,
        FileUpdateModule,
        FileDeleteModule,
        ObserverinputModule
    ],
  })
  export class SharedModule {}