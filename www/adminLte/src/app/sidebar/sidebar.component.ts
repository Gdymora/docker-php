import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.location.pathname; //звідки прийшов користувач
  }


  ngOnInit() {
    const body = this.document.querySelector('body');
    const sidebar = (<HTMLElement>body).querySelector('nav');
    const toggle = (<HTMLElement>body).querySelector('.toggle');
    const searchBtn = (<HTMLElement>body).querySelector('.search-box');
    const modeSwitch = (<HTMLElement>body).querySelector('.toggle-switch');
    const modeText = (<HTMLElement>body).querySelector('.mode-text');
    
    const arrow = (<HTMLElement>body).querySelectorAll('.arrow');
    for (let i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener('click', (event: any) => {  
        console.log(event.target.parentElement.parentElement)
        let arrowParent = event.target.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu');
      });
    }

    toggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('close');
    });

    searchBtn?.addEventListener('click', () => {
      sidebar?.classList.remove('close');
    });

    modeSwitch?.addEventListener('click', () => {
      (<HTMLElement>body).classList.toggle('dark');

      if ((<HTMLElement>body).classList.contains('dark')) {
        (<HTMLElement>modeText).innerText = 'Light mode';
      } else {
        (<HTMLElement>modeText).innerText = 'Dark mode';
      }
    });   
    
  }
} 