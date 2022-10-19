import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FileDeleteComponent } from "./components/file-delete.component";


@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [FileDeleteComponent],
    exports: [FileDeleteComponent]
  })
  export class FileDeleteModule { }