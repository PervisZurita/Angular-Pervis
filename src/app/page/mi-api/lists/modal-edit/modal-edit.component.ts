import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Carro } from '../interface/carro';
import { CarroService } from '../service/ejemplo.service';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.css'
})
export class ModalEditComponent {
  @Input() carro: Carro = {
    marca: '',
    modelo: '',
    anio: 0,
    precio: 0,
    color: '',
    _id: '',
    __v: 0
  };

  private bootstrapmodal: any;
  @ViewChild('modalElement') public modal!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private plataformId: object,
    private _carroService: CarroService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapmodal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(carro: Carro) {
    this.carro = carro;
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapmodal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  editarCarro(marca: string, modelo: string, anio: string, precio: string, color: string, id: string) {
    // Convertir los valores de 'anio' y 'precio' a números usando 'Number()'
    const newCarro: Carro = {
      marca: marca,
      modelo: modelo,
      anio: Number(anio),   // Convertir 'anio' de string a número
      precio: Number(precio), // Convertir 'precio' de string a número
      color: color,
      _id: id,
      __v: 0
    };
  
    this._carroService.putCarro(id, newCarro).subscribe({
      next: (response) => {
        console.log('Carro editado con éxito');
        this.closeModal();
        window.location.reload();
      },
      error: (error) => {
        console.error(`Error al intentar actualizar el carro: ${error}`);
      }
    });
  }
  
}
