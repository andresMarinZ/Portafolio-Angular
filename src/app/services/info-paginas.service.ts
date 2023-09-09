import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-paginas.interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginasService {

  info: InfoPagina = {};
  cargar = false;
  equipo:any[] = [];
  constructor(private http:HttpClient) {
     this.cargarInfo();
     this.cargarEquipo();
   }

 

  cargarInfo(){
    this.http.get('assets/data/data.pagina.json').subscribe( (resp : InfoPagina) =>{
    this.cargar = true;
    this.info = resp;
    })
  }
  

  private cargarEquipo(){
    this.http.get(environment.pageInformation).subscribe((resp:any[]) => {
      this.equipo = resp;
    })
  }
}
