import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../shared/model/usuario";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "../../shared/services/usuario.service";
import { MensagemSweetService } from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './manter-usuario.component.html',
  styleUrls: ['./manter-usuario.component.scss']
})
export class ManterUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', 0);
  modoEdicao = false;

  constructor(
    private roteador: Router,
    private rotaAtual: ActivatedRoute,
    private usuarioService: UsuarioService,
    private mensagemService: MensagemSweetService
  ) {}

  ngOnInit(): void {
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      this.modoEdicao = true;
      const usuarioAEditar = this.usuarioService.listar().find(usuario => usuario.id === idParaEdicao);
      if (usuarioAEditar) {
        this.usuario = usuarioAEditar;
      }
    }
  }

  salvar() {
    try {
      if (this.modoEdicao) {
        this.usuarioService.atualizar(this.usuario);
        this.mensagemService.sucesso('Usuário atualizado com sucesso.');
      } else {
        this.usuarioService.inserir(this.usuario);
        this.mensagemService.sucesso('Usuário cadastrado com sucesso.');
      }
      this.roteador.navigate(['listagem-usuarios']);
    } catch (e: any) {
      this.mensagemService.erro(e.message);
    }
  }
}
