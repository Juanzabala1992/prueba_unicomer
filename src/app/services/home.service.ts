import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getAllProducts() {    
    return this.http.get(`${environment.apiUrl}products`)
      .pipe(map((data: any) => {        
        return data;
      }));
  }
}
