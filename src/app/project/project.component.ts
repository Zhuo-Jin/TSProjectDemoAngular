import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Shared/project.service';
import { IProject } from '../app.interface';
import { Router, NavigationExtras } from '@angular/router';
import { TotalProjectImg } from 'src/environments/environment';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  totalProjImg: number = TotalProjectImg;
  projects : IProject[];
  project : IProject;

  //animation control
  animation_Drop:boolean[] = [];
  loading:boolean = true;

  constructor(private projectService : ProjectService, private router: Router) { 
    
  }

  ngOnInit() {
    this.refresh();
    this.loading = false;
  }

  refresh()
  {
    this.projectService.getAllProject()
      .subscribe(projects => {
        this.projects = projects;
        for(let proj of projects)
        {
          this.animation_Drop.push(false);
        }
        
      });

  }

  onClickRemoveProject(project: IProject, projectIndex: number)
  {

    
    this.animation_Drop[projectIndex] = true;
    this.projectService.removeProject(project.Id)
      .subscribe(p => {
        this.project = p;
        if (p != null){
          
          setTimeout(()=>{ this.removeProjectFromProjectList(project, projectIndex);}, 4000)
        }
      });
  }

  removeProjectFromProjectList(project: IProject,  projectIndex: number){
    const index: number = this.projects.indexOf(project);
    if (index !== -1) {
        this.projects.splice(index, 1);
    }
    this.animation_Drop[projectIndex] = false;   
  }

  openUpsertProjectComponent(project:IProject)
  {
    if (project == null)
      this.router.navigate(['upsertproject']);
    else
      this.router.navigate(['upsertproject', project.Id]);
    
  }
}
