import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CarroService } from '../service/ejemplo.service';
import { isPlatformBrowser } from '@angular/common';
import { Carro } from '../interface/carro';

@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [],
  templateUrl: './modal-agregar.component.html',
  styleUrl: './modal-agregar.component.css'
})
export class ModalAgregarComponent {
  private bootstrapModal: any;

  @ViewChild('modalElement') public modal!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private _carroService: CarroService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
    });
  }

  open() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }
  Agregar(marca: string, modelo: string, anio: string, precio: string, color: string) {
    // Convertimos los valores de anio y precio a números
    const anioNumero = parseInt(anio, 10); // convierte a entero
    const precioNumero = parseFloat(precio); // convierte a flotante
  
    // Verificamos si la conversión fue exitosa
    if (isNaN(anioNumero) || isNaN(precioNumero)) {
      console.error('Error: El año y el precio deben ser números válidos.');
      return; // Salimos de la función si la conversión falla
    }
  
    const nuevoCarro: Carro = {
      marca: marca,
      modelo: modelo,
      anio: anioNumero,
      precio: precioNumero,
      color: color
    };
  
    this._carroService.postCarro(nuevoCarro).subscribe({
      next: (res) => {
        console.log('Elemento agregado');
        this.closeModal();
        window.location.reload();
      },
      error: (error) => {
        console.log(`Error al agregar un nuevo elemento: ${error}`);
      }
    });
  }
  
}



