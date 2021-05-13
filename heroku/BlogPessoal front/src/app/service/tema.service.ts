import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //estou pegando uma lista de temas, então meu observable precisa ter um array
  getAllTema(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://blogpessoal-angela.herokuapp.com/tema', this.token)

  }

  getByIdTema(id: number): Observable<Tema>{
    return this.http.get<Tema>(`https://blogpessoal-angela.herokuapp.com/tema/${id}`, this.token)
  }

  getByNomeTema(nome: string): Observable<Tema[]>{
    return this.http.get<Tema[]>(`https://blogpessoal-angela.herokuapp.com/tema/nome/${nome}`, this.token)
  }

  //estou postando apenas um item do tema, então não coloco o array no tema, post um item or vez
  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('https://blogpessoal-angela.herokuapp.com/tema', tema, this.token)

  }

  putTema(tema: Tema): Observable<Tema>{ //colocando uma alteração
    return this.http.put<Tema>('https://blogpessoal-angela.herokuapp.com/tema', tema, this.token)
  }
  
  //Não preciso de observable aqui porque não é um objeto, e no meu back end ele onsegue trabalhar corretamente
  deleteTema(id: number){
    return this.http.delete(`https://blogpessoal-angela.herokuapp.com/tema/${id}`, this.token) //para receber o parâmetro do back end preciso usar '``' e '${}'
  }

}

//este documento é um service
