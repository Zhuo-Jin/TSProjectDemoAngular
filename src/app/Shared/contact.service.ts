import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject, IContact } from '../app.interface';
import { ApiBaseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl:string ;
  constructor(private http: HttpClient) { 
    this.baseUrl = ApiBaseUrl;

  }
  
  getAllAvalialeContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.baseUrl + 'contacts' )
  }

  removeContactById(contactId:number) : Observable<IContact> {
    return this.http.delete<IContact>(this.baseUrl + 'contacts/' +  contactId);
  }

  getDependentProjectNameByContactId (contactId:number) : Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'contacts/GetProjectContactDependency/' + contactId) 
  }

  upsertContact (contact : IContact) : Observable<IContact> {
    return this.http.post<IContact>(this.baseUrl + 'contacts/UpsertContact', contact);

  }
}
