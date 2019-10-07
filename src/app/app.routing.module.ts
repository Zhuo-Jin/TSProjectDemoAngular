import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';
import { AddUpdateProjectComponent } from './Project/add-update-project/add-update-project.component';

const routes: Routes = [
  
    {path: "home", component: HomeComponent},
    {path: "project", component: ProjectComponent},
    {path: "contact", component: ContactComponent},
    {path: "upsertproject/:id", component: AddUpdateProjectComponent},
    {path: "upsertproject", component: AddUpdateProjectComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  
  export class AppRoutingModule { }
  export  const RoutingComponents = [HomeComponent, ProjectComponent, ContactComponent, AddUpdateProjectComponent];