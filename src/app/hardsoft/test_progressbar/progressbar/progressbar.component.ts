import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Progress bars
    

  }

  ngAfterViewInit(){
    $(document).ready(function () {
      $('.progress .progress-bar').css("width",
        function () {
          return $(this).attr("aria-valuenow") + "%";
        }
      )
    });
  }

}
