import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Carro, CarrosAll } from "../interface/carro";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class CarroService {
    getAllEjemplo() {
      throw new Error('Method not implemented.');
    }  // Cambiado EjemploService a CarroService
    urlCarro: string = 'http://localhost:3000/api/carro';
  
    constructor(private http: HttpClient) { }
  
    // Obtener todos los carros
    getAllCarros(): Observable<CarrosAll> {
      return this.http.get<CarrosAll>(`${this.urlCarro}`);
    }
  
    // Crear un nuevo carro
    postCarro(nuevoCarro: Carro): Observable<Carro> {
      return this.http.post<Carro>(`${this.urlCarro}`, nuevoCarro);
    }
  
    // Actualizar un carro
    putCarro(id: string, carro: Carro): Observable<Carro> {
      return this.http.put<Carro>(`${this.urlCarro}/${id}`, carro);
    }
  
    // Eliminar un carro
    deleteCarro(id: string) {
      return this.http.delete(`${this.urlCarro}/${id}`);
    }
    searchCarro(termino: string): Observable<Carro[]> {
        return this.http.get<Carro[]>(`${this.urlCarro}/carros?search=${termino}`);
      }
  }
  