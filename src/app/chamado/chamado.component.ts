import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ChamadoService } from '../chamado.service';
import { DetalheService } from '../detalhe.service';
import 'rxjs/add/operator/debounceTime';
import * as moment from 'moment';

@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.css']
})
export class ChamadoComponent implements OnInit {

  @ViewChild('detalhesModal') detalhesModal: TemplateRef<object>;
  
  constructor(private chamadoService: ChamadoService, private detalheService: DetalheService) {
    this.modelChanged
      .debounceTime(300)
      .subscribe(model => {
        this.searchCall(model)
        this.model = model
      });
   }

  chamados = []
  chamadosOriginal = []
  detalhes = []
  loading = false
  loaderText = ""
  selecteChamado
  reloadNeeded
  modalStack = []
  public selectedTemplate: TemplateRef<object>
  modalVisible = false
  disablePending = false
  snackbarMessage
  isSnackbarVisible = false
  newInput
  model: string;
  modelChanged: Subject<string> = new Subject<string>();
  noResult = false
  selectedChamado
  showCreateChamado = false
  newTitulo
  newDescricao

  ngOnInit() {
    this.fetchAllChamados()
    setTimeout(()=>{
      this.searchCall('')
    }, 500)
  }


  fetchAllChamados(){
    this.showLoader()
    this.chamadoService.getAll().subscribe(res => {
      console.log(res)
      if(res.length > 0){
        this.chamadosOriginal = res
        this.chamadosOriginal.forEach(chamado => {
          chamado.statusPT = chamado.status ? 'Concluido' : 'Aberto'
        })
        this.chamados = this.chamadosOriginal
      } else {
        this.noResult = true
      }
      this.closeLoader()
    }, err => {
      console.log(err)
    })
  }

  fetchDetalhes(chamadoId){
    this.detalheService.getDetalheByChamadoId(chamadoId).subscribe(res => {
      this.detalhes = res
    }, err => {
      console.log(err)
    })
  }

  openTemplateFromReference(chamado){
    this.fetchDetalhes(chamado.id)
    this.selectedChamado = chamado
    this.disablePending = false
    this.reloadNeeded = undefined
    this.modalStack.push(this.detalhesModal)
    this.selectedTemplate = this.detalhesModal
    this.modalVisible = true
  }

  closeModal(){
    this.modalStack.pop()

    if(this.modalStack.length > 0){
      this.selectedTemplate = this.modalStack[this.modalStack.length-1]
    }else{
      this.modalVisible = false
    }

    if(!!this.reloadNeeded){
      this.reloadNeeded()
    }
    this.detalhes = []
    this.newInput = ''
    this.selectedChamado = 0
  }

  changeStatus(chamado){
    let that = this
    let changeChamado = chamado
    changeChamado.status = !chamado.status
    that.chamadoService.updateStatus(changeChamado.id, changeChamado.status).subscribe(res => {
      console.log(res)
      if(res){
        chamado.statusPT = chamado.status ? 'Concluido' : 'Aberto'
        chamado.dataConclusao = chamado.status ? moment().format('YYYY-MM-DD') : '-'
        that.getStatusColorByCode(chamado.status)
      } else {
        that.showSnackbarWithMessage('Erro ao atualizar status.')
        chamado.status = !chamado.status
      }
      that.showSnackbarWithMessage('Status atualizado com sucesso.')
    }, err => {
      console.log(err)
    })
  }

  showSnackbarWithMessage(message: string){
    this.snackbarMessage = message
    this.isSnackbarVisible = true
    setTimeout(() => {
      this.hideSnackbar()
    }, 3000)
  }

  hideSnackbar(){
    this.isSnackbarVisible = false
  }
  
  addChamado(){
    this.showCreateChamado = true
  }

  changed(text: string) {
    this.modelChanged.next(text);
  }

  getStatusColorByCode(status){
    status = status === true
    switch(status){
      case false:
        return '#FFC000'
      case true:
        return '#52b303'
    }
  }

  searchCall(text){
    if(text != ''){
      this.chamados = this.chamadosOriginal.filter(x => x.titulo.includes(text))
    } else {
      this.chamados = this.chamadosOriginal
    }
  }

  addComentario(){
    let that = this
    this.detalheService.addComentario(this.newInput, this.selectedChamado).subscribe(res => {
      console.log(res)
      that.closeModal()
      that.showSnackbarWithMessage('Comentário adicionado com sucesso.')
    }, err => {
      console.log(err)
    })
  }

  showLoader(title?){
    const loaderTitle = !!title ? title : "loading"
    this.loaderText = loaderTitle
    this.loading = true
  }

  closeLoader(){
    this.loading = false
    this.loaderText = ""
  }

  return(){
    this.showCreateChamado = false
    this.newTitulo = ''
    this.newDescricao = ''
    this.fetchAllChamados()
  }

  saveNewChamado(){
    let that = this
    let newChamado = {
      titulo: this.newTitulo,
      descricao: this.newDescricao,
      status: false,
      dataInclusao: moment().format('YYYY-MM-DD'),
      dataConclusao: null
    }
    this.chamadoService.addChamado(newChamado).subscribe(res => {
      console.log(res)
      that.showSnackbarWithMessage('Chamado adicionado com sucesso.')
      that.return()
    }, err => {
      console.log(err)
    })
  }
}
