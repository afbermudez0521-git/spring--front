import { Cliente } from '../clases/cliente';

var id_count = 1;
export const CLIENTES: Cliente[] = [
    { id:id_count++, nombre:"Felipe", apellido:"Bermudez" },
    { id:id_count++, nombre:"Maria", apellido:"Basto" },
    { id:id_count++, nombre:"Merlin", apellido:"Bermudez Basto" }
];