import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  usuarioCorrecto = false;
  userName = '';
  pass = '';
  usuarioRegistrado="";
  rutaBack=environment.rutaBack;
  id="";

  datos: any[];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.usuarioCorrecto=this.checkUserCookieExists();
    if(this.checkUserCookieExists()){
      this.usuarioRegistrado=this.getUserCookieValue();
      this.id=this.getIDCookieValue();
    }
  }


//conexión al back para comprobar el login
  comprobarUsuario() {
    console.log('comprobando usuario');
    this.http
      .get<any>(
        this.rutaBack+'comprobarUsuario.php?usuario=' +
          this.userName +
          '&password=' +
          this.pass
      )
      .subscribe((data) => {
        this.datos=data;
        console.log(data.length);
        if (data.length == 1) {
          this.usuarioCorrecto = true;
        }
        if (this.usuarioCorrecto) {
          console.log('loginCorrecto');
          console.log(data);
          console.log(this.datos);
          this.createCookie(this.datos[0].Usuario);
          this.createCookieID(this.datos[0].ID)
        } else {
          console.log('error');
          alert("nombre de usuario o contraseña incorrecta");
        }
      });
  }

  // Función para crear una cookie del nombre de usuario
  createCookie(value: string) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 30 * 60 * 1000);

    const cookie = `user=${encodeURIComponent(
      value
    )};expires=${expires.toUTCString()};path=/`;
    document.cookie = cookie;
  }

  //Función para crear una cookie con el id del profesor
  createCookieID(value: string) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 30 * 60 * 1000);

    const cookie = `ID=${encodeURIComponent(
      value
    )};expires=${expires.toUTCString()};path=/`;
    document.cookie = cookie;
  }


  //comprobar si la cookie user existe
  checkUserCookieExists(): boolean {
    const cookieName = "user";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName + "=") === 0) {
        return true;
      }
    }

    return false;
  }

  //extraer el valor de la cookie user
  getUserCookieValue(): string | null {
    const cookieName = "user";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName + "=") === 0) {
        return cookie.substring(cookieName.length + 1);
      }
    }

    return null;
  }
  getIDCookieValue(): string | null {
    const cookieName = "ID";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName + "=") === 0) {
        return cookie.substring(cookieName.length + 1);
      }
    }

    return null;
  }


  deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const cookieName = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }

    location.reload();
  }
}

