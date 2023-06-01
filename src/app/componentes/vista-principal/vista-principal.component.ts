import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.scss'],
})
export class VistaPrincipalComponent {
  options = [{ Curso: '', Grupo: '', id: '', Resumen: '' }];
  alumnosParaAutocomplete = [{ Nombre: '', Apellido: '', ID: '' }];
  tipoParte = ['Verde', 'Naranja', 'Rojo'];
  datos: any[];
  alumnos: any[];
  opcionSeleccionada = '';
  idSeleccionado = '';
  isGrupoSelected = false;
  alumnoSeleccionado = '';
  parteSeleccionado = '';
  fechaSeleccionada = '';
  motivos = '';
  idProfesor = '';
  idAlumnoSeleccionado = '';
  fecha: string[];
  fechaFormateada = '';

  constructor(private http: HttpClient) {
    this.getGrupos();
  }
  getGrupos() {
    console.log('comprobando usuario');
    this.http
      .get<any>(environment.rutaBack + 'consultarGrupos.php')
      .subscribe((data) => {
        this.datos = data;
        for (let i = 0; i < this.datos.length; i++) {
          this.options[i] = {
            Curso: this.datos[i].curso,
            Grupo: this.datos[i].grupo,
            id: this.datos[i].id,
            Resumen:
              this.datos[i].curso + 'º ' + this.datos[i].grupo.toUpperCase(),
          };
        }
      });
  }
  cambioGrupo() {
    this.idSeleccionado = this.opcionSeleccionada.split(':')[0];
    console.log(this.idSeleccionado);
    this.isGrupoSelected = true;
    this.getAlumnosdelGrupo();
  }

  getAlumnosdelGrupo() {
    this.http
      .get<any>(
        environment.rutaBack +
          'consultarAlumnos.php' +
          '?grupo=' +
          this.idSeleccionado
      )
      .subscribe((data) => {
        console.log(data);
        this.alumnos = data;
        for (let i = 0; i < this.datos.length; i++) {
          this.alumnosParaAutocomplete[i] = {
            Nombre: this.alumnos[i].Nombre,
            Apellido: this.alumnos[i].Apellido,
            ID: this.alumnos[i].ID,
          };
        }
      });
  }

  verAlumnoSeleccionado() {
    console.log(this.alumnoSeleccionado);
  }

  ponerParte() {
    this.idProfesor = this.getIDCookieValue();
    this.idAlumnoSeleccionado = this.alumnoSeleccionado.split(':')[0];
    this.fecha = this.fechaSeleccionada.toString().split(' ');
    let mes = '';
    switch (this.fecha[1].toUpperCase()) {
      case 'JAN':
        mes = '01';
        break;
      case 'FEB':
        mes = '02';
        break;
      case 'MAR':
        mes = '03';
        break;
      case 'APR':
        mes = '04';
        break;
      case 'MAY':
        mes = '05';
        break;
      case 'JUN':
        mes = '06';
        break;
      case 'JUL':
        mes = '07';
        break;
      case 'AUG':
        mes = '08';
        break;
      case 'SEP':
        mes = '09';
        break;
      case 'OCT':
        mes = '10';
        break;
      case 'NOV':
        mes = '11';
        break;
      case 'DEC':
        mes = '12';
        break;
    }
    this.fechaFormateada = this.fecha[3] + '-' + mes + '-' + this.fecha[2];
    console.log('profesor: ' + this.idProfesor);
    console.log('alumno: ' + this.idAlumnoSeleccionado);
    console.log('tipo parte ' + this.parteSeleccionado);
    console.log('fecha parte ' + this.fechaFormateada);
    console.log('Motivo ' + this.motivos);

    //&tipo=verde&motivo=asdf%C3%B1kajsdfl%C3%B1kaj

    if (
      this.idProfesor != '' &&
      this.idAlumnoSeleccionado != '' &&
      this.parteSeleccionado != '' &&
      this.fechaSeleccionada != '' &&
      this.motivos != ''
    ) {
      let url =
        environment.rutaBack +
        'insertarParte.php?fecha=' +
        this.fechaFormateada +
        '&idalumno=' +
        this.idAlumnoSeleccionado+
        '&idprofesor='+
        this.idProfesor+
        '&tipo='+
        this.parteSeleccionado+
        '&motivo='+
        this.motivos
        ;
        this.http.get(url)
        .subscribe(
          (response) => {
            console.log('Datos insertados correctamente');
          },
          (error) => {
            console.error('Error al insertar datos:', error);
          }
        );
      alert('parte guardado');
      location.reload();
    } else {
      alert('Complete todos los campos para continuar');
    }
  }

  getIDCookieValue(): string | null {
    const cookieName = 'ID';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName + '=') === 0) {
        return cookie.substring(cookieName.length + 1);
      }
    }

    return null;
  }
}
