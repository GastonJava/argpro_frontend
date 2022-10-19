import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileUploadComponent,
    multi: true
  }]
})
export class FileUploadComponent implements ControlValueAccessor  {

  onChange: Function;
  file: File | null = null;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;

  /*
  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file); 
    this.file = file;
  }
  */

  constructor(private host: ElementRef<HTMLInputElement>) { }
  
  ngOnInit() {
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    //console.log(this.selectedFiles[0]);

    //this.onChange(this.selectedFiles);
    //console.log(`funcionara: ${this.selectedFiles.item(0)}`);

  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      //this.file = this.selectedFiles.item(0);
      //console.log("desde FILE UPLOAD "+JSON.stringify(file));

      if (file) {
        //console.log("dentro de FILE UPLOAD "+JSON.stringify(file));
        //console.log("dentro de file: "+JSON.stringify(file));
        this.preview = '';
        this.currentFile = file;

        //console.log("this.curreentfile: "+JSON.stringify(this.currentFile));

        const reader = new FileReader();

        reader.onload = (e: any) => {
          //console.log(e.target.result);

         
          this.preview = e.target.result;
        };

        console.log(reader.readAsDataURL(this.currentFile));
        debugger
        //console.log("reader: this.preview: "+JSON.stringify(this.preview));
      }
    }
  }

  writeValue(value: null): void {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }
 
  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  
  setDisabledState?(isDisabled: boolean): void {
  }

  registerOnTouched(fn: Function): void {
  }

 

}