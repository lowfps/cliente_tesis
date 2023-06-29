export interface Auth {
  user:  UserR;
  token: string;
  cod_usuario: number;

}

export interface UserR {
  cod_rol: number ,
  nombre_usuario: string,
  correo_usuario: string,
  clave_usuario: string,
}
