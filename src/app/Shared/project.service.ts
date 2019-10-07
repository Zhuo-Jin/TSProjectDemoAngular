import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from '../app.interface';
import { ApiBaseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl:string ;
  constructor(private http: HttpClient) { 
    this.baseUrl = ApiBaseUrl;

  }

  
  getAllProject() : Observable<IProject[]> {
    return this.http.get<IProject[]>(this.baseUrl + 'projects' )
  }

  getProjectById(projectId : number) : Observable<IProject> {
    return this.http.get<IProject>(this.baseUrl + 'projects/' + projectId)
  }

  removeProject(projectId: number) : Observable<IProject> {
    return this.http.delete<IProject>(this.baseUrl + 'projects/' + projectId);
  }

  upsertProject(project: IProject) : Observable<IProject> {
    return this.http.post<IProject>(this.baseUrl + 'projects/UpsertProject', project);
  }




}
