import { Component, ComponentRef, HostListener, OnInit, ViewContainerRef } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Type } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // private routes: Routes;

  // constructor(private router: Router, private viewContainerRef: ViewContainerRef) {
  //   this.routes = this.router.config;
  // }
  // /**
  //  * method dynamic add route and component
  //  * @param routePath 
  //  * @param componentType 
  //  * @example this.addNewRouteAndComponent('/new-route', NewComponent);
  //  */
  // addNewRouteAndComponent(routePath: string, componentType: Type<any>) {
  //   const newRoute: Routes = [{ path: routePath, component: componentType }];
  //   this.router.config.unshift(...newRoute);
  //   const componentRef = this.createComponent(componentType);
  //   const rootComponent = document.getElementsByTagName('app-root')[0];
  //   rootComponent.appendChild(componentRef.location.nativeElement);
  // }

  // createComponent(componentType: Type<any>): ComponentRef<any> {
  //   const componentRef = this.viewContainerRef.createComponent(componentType);
  //   return componentRef;
  // }

  // createDynamicComponent() {
  //   // Define the dynamic component
  //   @Component({
  //     template: `<h1>Hello, dynamically created component!</h1>`
  //   })
  //   class DynamicComponent { }
  //   this.addNewRouteAndComponent('/new-route', DynamicComponent);
  // }

}
