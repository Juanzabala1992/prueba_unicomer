import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http:HttpClient) { }

  getProduct(id:number) {    
    return this.http.get(`${environment.apiUrl}products/${id}`)
      .pipe(map((data: any) => {        
        return data;
      }));
  }
}
