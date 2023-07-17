import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'english-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements  OnDestroy{
  id: any = 'dictionary';
  private subscription: Subscription;

  products: any = {
    "dictionary": [
      {
        id: "dictionary-20",
        route: "dictionary",
        text: { en: "Dictionary-20", "uk": "словник" },
      }, 
      {
        id: "dictionary-50",
        route: "dictionary",
        text: { en: "Dictionary-50", "uk": "словник" },
      },
      {
        id: "dictionary-verb-100",
        route: "dictionary",
        text: { en: "Dictionary top 100 verbs", "uk": "словник" },
      }, 
      {
        id: "dictionary-adjectives-20",
        route: "dictionary",
        text: { en: "Dictionary top 20 adjectives", "uk": "словник" },
      }, 
      
    ],

    "example": [
      {
        id: "dictionary",
        route: "dictionary",
        text: { en: "dictionary", "uk": "словник" },
      },
      {
        id: "example",
        route: "example",
        text: { en: "example", "uk": "словник" },
      },
      {
        id: "lesson",
        route: "lesson",
        text: { en: "lesson", "uk": "словник" },
      },
      {
        id: "part-1",
        route: "part-1",
        text: { en: "part-1", "uk": "словник" },
      }
    ],

    "lesson": [
      {
        id: "dictionary",
        route: "dictionary",
        text: { en: "dictionary", "uk": "словник" },
      },
      {
        id: "example",
        route: "example",
        text: { en: "example", "uk": "словник" },
      },
      {
        id: "lesson",
        route: "lesson",
        text: { en: "lesson", "uk": "словник" },
      },
      {
        id: "part-1",
        route: "part-1",
        text: { en: "part-1", "uk": "словник" },
      }
    ],
    "part-1": [
      {
        id: "dictionary",
        route: "dictionary",
        text: { en: "dictionary", "uk": "словник" },
      },
      {
        id: "example",
        route: "example",
        text: { en: "example", "uk": "словник" },
      },
      {
        id: "lesson",
        route: "lesson",
        text: { en: "lesson", "uk": "словник" },
      },
      {
        id: "part-1",
        route: "part-1",
        text: { en: "part-1", "uk": "словник" },
      }
    ]

  };

  constructor(
    private activateRoute: ActivatedRoute,
  ) {
    this.subscription = activateRoute.params.subscribe(
      params => this.id = params['id']
    );
    console.log(this.id)
  }


ngOnDestroy() {
  this.subscription.unsubscribe();
}
}