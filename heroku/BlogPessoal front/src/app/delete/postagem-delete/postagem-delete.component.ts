import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/model/Postagem';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from 'src/app/service/postagem.service';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertInfo('Ops, sua seção expirou... Por favor faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem) 
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{

      this.postagem = resp
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPostagem).subscribe(()=>{
      this.alertas.showAlertSuccess('Postagem apagada.')
      this.router.navigate(['/inicio'])
    })
  }

}
