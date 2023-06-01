import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-tabla-partes',
  templateUrl: './tabla-partes.component.html',
  styleUrls: ['./tabla-partes.component.scss']
})
export class TablaPartesComponent {

  datos: any[];
  displayedColumns: string[] = ['Curso', 'Grupo', 'Nombre', 'Apellidos', 'Fecha', 'Tipo','Motivo'];
  constructor(private http:HttpClient){
    this.getPartes();

  }
  getPartes(){
    this.http.get<any>(
      environment.rutaBack+"consultarPartes.php"
    ).subscribe((data) => {
      this.datos=data;
      this.datos.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);

        return fechaA.getTime() - fechaB.getTime();
      });
      console.log(this.datos);
    })
  }

}
