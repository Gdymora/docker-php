import { Component, ComponentFactoryResolver, ComponentRef, Injector, NgModule, ViewContainerRef } from '@angular/core';
import { Routes, RouterModule, Router, Route } from '@angular/router';
import { CategoriesComponent } from './navigation/categories/categories.component';
import { ProductsComponent } from './navigation/products/products.component';
import { Type } from '@angular/core';
const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  }, {
    path: 'comments', loadChildren: () => import('./pages/comments/comments.module')
      .then(m => m.CommentsModule)
  }, {
    path: 'home', loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomeModule)
  }, {
    path: 'media-files', loadChildren: () => import('./pages/media-files/media-files.module')
      .then(m => m.MediaFilesModule)
  }, {
    path: 'notes', loadChildren: () => import('./pages/notes/notes.module')
      .then(m => m.NotesModule)
  },{
    path: 'pages', loadChildren: () => import('./pages/pages/pages.module')
      .then(m => m.PagesModule)
  },  {
    path: 'plagins', loadChildren: () => import('./pages/plagins/plagins.module')
      .then(m => m.PlaginsModule)
  }, {
    path: 'settings', loadChildren: () => import('./pages/settings/settings.module')
      .then(m => m.SettingsModule)
  }, {
    path: 'tools', loadChildren: () => import('./pages/tools/tools.module')
      .then(m => m.ToolsModule)
  }, {
    path: 'users', loadChildren: () => import('./pages/users/users.module')
      .then(m => m.UsersModule)
  }, {
    path: 'view', loadChildren: () => import('./pages/view/view.module')
      .then(m => m.ViewModule)
  },
  {
    path: 'products/:id',
    component: ProductsComponent
  },
  {
    path: 'dictionary-table', loadChildren: () => import('./dynamic-tables/dynamic-tables.module')
      .then(m => m.DynamicTablesModule)
  },
  { path: "", redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    onSameUrlNavigation: "reload",
  }),],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
