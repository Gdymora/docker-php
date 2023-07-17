import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  // categories = new Array(20).fill(0);
  categories = [
    {
      id: 0,
      route: "dictionary",
      text: {en: "dictionary", "uk":"словник"},
    },
    {
      id: 0,
      route: "example",
      text: {en: "example", "uk":"словник"},
    },
    {
      id: 0,
      route: "lesson",
      text: {en: "lesson", "uk":"словник"},
    },
    

  ];
  constructor() { }

  ngOnInit() {
  }

}