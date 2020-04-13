import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-paginas.interfaces';


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
    this.http.get('https://angularhtml-b5b5e.firebaseio.com/equipo.json').subscribe((resp:any[]) => {
      this.equipo = resp;
      // console.log(this.equipo);
    })
  }
}
