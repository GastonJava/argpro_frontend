import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ObserverinputComponent } from "./observerinput.component";



@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [	 ObserverinputComponent,
      //TooltipDirective
   ],
    exports: [ ObserverinputComponent ]
  })
  export class ObserverinputModule { }