import { Injectable } from '@angular/core';
import { Usuario } from "../model/usuario";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioRestService {

  private readonly URL_USUARIOS = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.URL_USUARIOS);
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}/${id}`);
  }

  inserir(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario);
  }

  atualizarUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.URL_USUARIOS}/${id}`, usuario);
  }

  deletarUsuario(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL_USUARIOS}/${id}`);
  }
}
