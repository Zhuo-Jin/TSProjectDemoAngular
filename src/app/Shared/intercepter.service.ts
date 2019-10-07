import {HttpInterceptor, HttpEvent, HttpRequest,HttpErrorResponse , HttpHandler, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';

@Injectable()
export class IntercepterService implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      return next.handle(request)
                .pipe(catchError(this.handleError));

    }

    handleError(error : HttpErrorResponse) : Observable<any>
    {
        if (error.error instanceof ErrorEvent){
            
            console.log("this is client error", error.message);
            return Observable.throw(error);
        }
        else{
            
            console.log("this is server error", error.message);
            return Observable.throw(error);

        }
        
    }


}
