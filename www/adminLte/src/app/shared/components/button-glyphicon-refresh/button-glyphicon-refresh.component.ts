import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button-glyphicon-refresh',
  template: `
  <div class="button-container">
      <div id={{idSpiner}} #spinerElementRef *ngIf="spinerS" class="spinner-container">
          <mat-spinner diameter={{diameter}}></mat-spinner>
      </div>
  <button mat-button [color]="color" [disabled]="spinerS"><mat-icon>cached</mat-icon></button>
  </div>
`,
  styleUrls: ['./button-glyphicon-refresh.component.scss']
})

export class ButtonGlyphiconRefreshComponent implements OnInit {
  @Input() color: string;
  @Input() diameter: number;
  @Input() idSpiner: string;
  spinerS = false;
  @Input() uploadSuccess: EventEmitter<any>;
  @ViewChild('spinerElementRef') spinerElement: ElementRef;

  ngOnInit(): void {
    if (this.uploadSuccess) {
      this.uploadSuccess.subscribe(data => {
        if (data.id === this.idSpiner) {
          const element = document.getElementById(String(this.idSpiner));
          if (element) {
            element.style.display = 'none' ? 'flex' : 'none';
          }
          this.spinerS = data.spiner;
          if (data.spiner !== 'true') {
            this.spinerElement.nativeElement.style.display = 'none';
          }
        }
      });

    }
  }
  constructor(@Inject(DOCUMENT) private document: Document) { }
}
