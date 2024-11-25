export interface CarrosAll {
    carros: Carro[];
}

export interface Carro {
    _id?:    string;
    marca:  string;
    modelo: string;
    anio:    number;
    precio: number;
    color:  string;
    __v?:    number;
}
