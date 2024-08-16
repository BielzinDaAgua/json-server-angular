import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../shared/model/usuario";
import { Router } from "@angular/router";
import { UsuarioRestService } from "../../shared/services/usuario-rest.service";
import { MensagemSweetService } from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss']
})
export class ListagemUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    private roteador: Router,
    private usuarioService: UsuarioRestService,
    private mensagemService: MensagemSweetService
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listar().subscribe({
      next: usuariosRetornados => this.usuarios = usuariosRetornados,
      error: (e) => this.mensagemService.erro('Erro ao listar usuários: ' + e.message)
    });
  }

  remover(usuarioARemover: Usuario) {
    this.usuarioService.deletarUsuario(usuarioARemover.id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== usuarioARemover.id);
        this.mensagemService.sucesso('Usuário removido com sucesso.');
      },
      error: (e) => this.mensagemService.erro('Erro ao remover usuário: ' + e.message)
    });
  }

  editar(usuarioAEditar: Usuario) {
    this.roteador.navigate(['edicao-usuario', usuarioAEditar.id]);
  }
}
