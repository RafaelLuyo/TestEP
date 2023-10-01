import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {KnowledgeComponent} from "./pages/knowledge/knowledge.component";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "", redirectTo: "home", pathMatch:"full"},
  {path: "knowledge", component: KnowledgeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
