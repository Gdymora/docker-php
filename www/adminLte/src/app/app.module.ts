import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RestartDialogComponent } from './restart-dialog/restart-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoriesComponent } from './navigation/categories/categories.component';
import { ProductsComponent } from './navigation/products/products.component';
import { ComponentsModule } from './navigation/components/components.module';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component'; 
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    RestartDialogComponent,
    CategoriesComponent,
    ProductsComponent,
    NavbarComponent,
    SidebarComponent    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
