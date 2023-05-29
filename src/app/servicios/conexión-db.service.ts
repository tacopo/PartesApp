import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexiónDBService {
  url='localhost:3306';
  constructor(private http: HttpClient) { }

  getUsuarios(){
    console.log("obteniendo usuarios");
    return this.http.get('${this.url}getUsuarios.php');
  }
}
