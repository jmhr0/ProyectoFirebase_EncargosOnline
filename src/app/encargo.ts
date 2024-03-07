export interface Encargo {
    nombre: string;
    cantidad: BigInteger;
    estado: string;
    responsable: string;
    objeto: string;
    numeroResponsable: BigInteger;
    prioritario:  boolean;
}