import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";

export class PrintPdf {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  static exportToPdf(tableId: string, classDellPff?: string): void {
    let printContents;
    let popupWin;

    const div = document.getElementById(tableId);

    if (!div) {
      return;
    }
    Array.from(div.getElementsByClassName('dellPdf')).forEach(n => n.remove());
    printContents = div?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <html>
      <head>
        <title>Print tab</title>
      </head>
      <body onload="window.print();window.close()">
           <table class="table table-bordered">${printContents}</table>
      </body>
    </html>`
    );

    popupWin.document.close();
  }
}
