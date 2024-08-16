import { Injectable } from '@angular/core';
import { Usuario } from "../model/usuario";
import { UsuarioRestService } from "./usuario-rest.service";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private usuarioRestService: UsuarioRestService) {}

  inserir(usuario: Usuario): Observable<void> {
    return this.usuarioRestService.listar().pipe(
      switchMap(usuarios => {
        this.validarMaiorIdade(usuario);
        this.validarIdsDiferentes(usuario, usuarios);
        return this.usuarioRestService.inserir(usuario);
      }),
      map(() => {})
    );
  }

  listar(): Observable<Usuario[]> {
    return this.usuarioRestService.listar();
  }

  remover(usuario: Usuario): Observable<void> {
    return this.usuarioRestService.deletarUsuario(usuario.id);
  }

  atualizar(usuario: Usuario): Observable<void> {
    return this.usuarioRestService.listar().pipe(
      switchMap(usuarios => {
        this.validarMaiorIdade(usuario);
        if (!usuarios.some(u => u.id === usuario.id)) {
          throw new Error('Usuário não encontrado.');
        }
        return this.usuarioRestService.atualizarUsuario(usuario.id, usuario);
      }),
      map(() => {})
    );
  }

  private validarMaiorIdade(usuario: Usuario) {
    if (usuario.idade < 18) {
      throw new Error('Usuário não pode ser menor de 18 anos!');
    }
  }

  private validarIdsDiferentes(usuario: Usuario, usuarios: Usuario[]) {
    const usuarioEncontrado = usuarios.find(u => u.id === usuario.id);
    if (usuarioEncontrado) {
      throw new Error('ID já cadastrado!');
    }
  }
}
