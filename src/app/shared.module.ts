import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
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
        ObserverinputModule,
        SweetAlert2Module.forRoot(),
    ],

    //=> Basic usage (forRoot can also take options, see the wiki)
    

    exports: [
        FormsModule,
        ReactiveFormsModule,
        FileuploadModule,
        FileUpdateModule,
        FileDeleteModule,
        ObserverinputModule,
        SweetAlert2Module
    ],
  })
  export class SharedModule {}