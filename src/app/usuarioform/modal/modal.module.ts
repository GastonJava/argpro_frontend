import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";


import { MaterialModule } from "src/app/material.module";
import { FileUploadComponent } from "src/app/share/services/input file/file-upload/file-upload.component";
import { CrearComponent } from "../crear/component/crear.component";
import { CrearModule } from "../crear/Crear.module";
import { LoginComponent } from "../login/component/login.component";
import { LoginModule } from "../login/login.module";

import { ModalComponent } from "./component/modal.component";
import { ModalRouting } from "./modal.routing";


@NgModule({
    imports: [
        FormsModule,
        ModalRouting,
        CommonModule,
        LoginModule,
        CrearModule,
        MaterialModule,
        MatSlideToggleModule
    ],
    declarations: [
        ModalComponent,
    ],
    exports: []
})
  
  export class ModalModule {}