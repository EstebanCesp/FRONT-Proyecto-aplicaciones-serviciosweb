import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthSendemailService {
  private codigo: string = '';
  email: string = '';
  constructor(private http:HttpClient) {}

  generateCode() {
    this.codigo = Math.floor(1000 + Math.random() * 9000).toString();
  }

  resetCode() {
    this.codigo = '';
    this.email = '';
  }

  verifyCode(inputCode: string): boolean {
    return inputCode === this.codigo;
  }
  async sendCode(email: string): Promise<boolean> {
    this.email = email;
    return this.http.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: 'service_e7azuxp',
      template_id: 'template_sizucqz',
      user_id: '92-1eo0fCVACW_IjX',
      template_params: {
        email: email,
        codigo: this.codigo
      },
      accessToken:enviroment.accessToken
    }).toPromise().then(
      response => {
        return true;
      },
      error => {
        return false;
      }
    );
  }

}
