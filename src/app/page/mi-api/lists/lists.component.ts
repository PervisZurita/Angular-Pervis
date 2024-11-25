import { Component, OnInit, ViewChild } from '@angular/core';
import { CarrosAll } from './interface/carro';
import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';
import { CarroService } from './service/ejemplo.service';
import { CarroListComponent } from './ejemplo-list/ejemplo-list.component';
import { ModalEditComponent } from "./modal-edit/modal-edit.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ModalAgregarComponent, CarroListComponent, ModalEditComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  carro:CarrosAll | undefined

  @ViewChild(ModalAgregarComponent) public modal!:ModalAgregarComponent
  constructor(
    private _srvCarro:CarroService
  ){}

  ngOnInit(): void {
    this._srvCarro.getAllCarros().subscribe(car => {
      this.carro = car
      console.log(this.carro)
    })
  }



  openModal(){
    if(this.modal){
      this.modal.open()
    }
  }
}