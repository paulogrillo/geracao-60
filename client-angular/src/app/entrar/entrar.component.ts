import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  signIn() {
    this.auth.entrar(this.userLogin).subscribe(
      (resp: UserLogin) => {
        this.userLogin = resp;
        environment.token = this.userLogin.token;
        environment.username = this.userLogin.username;
        environment.email = this.userLogin.email;
        environment.id = this.userLogin.id;
        alert('Usuário logado!');


        this.router.navigate(['/inicio'])

      },
      (erro) => {
        if (erro.status == 500) {
          alert('Usuário ou senha incorretos!');
        }
      }
    );
  }
}
