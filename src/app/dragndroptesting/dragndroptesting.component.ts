import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragndroptesting',
  templateUrl: './dragndroptesting.component.html',
  styleUrls: ['./dragndroptesting.component.scss']
})
export class DragndroptestingComponent implements OnInit {

/*
  todo = [
    'Angular',
    '.Net',
    'Html',
    'Css',
    'Typescript',
    'MySql',
    'Javascript'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  review = [
    'Take bath',
    'Wash car',
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  */

  falseortrue: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
