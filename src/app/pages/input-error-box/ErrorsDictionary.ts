export const formErrorsDictionary: ErrorsDictionary = {
  required: 'Este campo es requerido!',
  minlength: 'Debe introducir mas caracteres!',
  maxlength: 'Ha excedido el limite de caracteres!',
  existeId: 'ID en uso!',
};

export interface ErrorsDictionary {
  required: string;
  minlength: string;
  maxlength: string;
  existeId: string;
}
