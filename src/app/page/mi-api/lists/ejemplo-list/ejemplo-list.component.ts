import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Carro, CarrosAll } from '../interface/carro';
import { CarroService } from '../service/ejemplo.service';
import { NgFor, NgIf } from '@angular/common';

import { ModalEditComponent } from '../modal-edit/modal-edit.component';
@Component({
selector: 'app-ejemplo-list',
  standalone: true,
  imports: [NgFor, NgIf,ModalEditComponent],
  templateUrl: './ejemplo-list.component.html',
  styleUrls: ['./ejemplo-list.component.css']
})
export class CarroListComponent implements OnInit {
   @Input() carro: CarrosAll | undefined;
  @ViewChild(ModalEditComponent) public modal!: ModalEditComponent;  // Obtención del modal

  constructor(private carroService: CarroService) {}

  ngOnInit(): void {}

  openModal(carro: Carro): void {
    if (this.modal) {
      this.modal.open(carro);  // Abre el modal pasando el objeto carro
    } else {
      console.error('Modal no encontrado');
    }
  }

  eliminarEjemplo(id: string): void {
    this.carroService.deleteCarro(id).subscribe(() => {
      console.log('Ejemplo eliminado');
      window.location.reload();
    });
  }
}