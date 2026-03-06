import { Component } from '@angular/core';
import { aliadoService } from '../../services/aliado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aliados',
  imports: [CommonModule],
  templateUrl: './aliados.html',
  styleUrl: './aliados.css',
})
export class Aliados {
  public listaAliados:any;
  constructor(private aliadoService : aliadoService) {}

  ngOnInit(){
    this.ObtenerAliados()
  }

  ObtenerAliados(){ 
    let isOk: boolean;
    let responseList : any ;
    this.aliadoService.getAliados().subscribe(
      {
        next: (response) => {responseList = response; isOk=true; console.log(responseList)},
        error: (err) => {console.error('Error al obtener datos', err); isOk=false},
        complete: () => {
          if(isOk){
            this.listaAliados = responseList.datos
          }
        }
      }
    );
  }
}
