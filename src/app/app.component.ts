import { Component } from '@angular/core';
import { InfoPaginasService } from './services/info-paginas.service';
import { ProductosService } from './services/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor ( private _infoService: InfoPaginasService,
                private _productos:ProductosService
                ){

  }
}
