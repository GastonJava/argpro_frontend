import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpdateComponent } from './component/file-update.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FileUpdateComponent],
  exports: [FileUpdateComponent]
})
export class FileUpdateModule { }
