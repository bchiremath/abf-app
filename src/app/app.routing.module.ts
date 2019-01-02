import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from "./crud/crud.component";
import { HomeComponent } from "./home/home.component";
import { PracticeComponent } from "./practice/practice.component";

export const routes: Routes = [
  { path: 'practive',  component: PracticeComponent },
  { path: 'crud', component: CrudComponent },
  { path: '',  component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
