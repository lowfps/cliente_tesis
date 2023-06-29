export class User{

	constructor(
    public cod_usuario?: number,
    public cod_rol?: any,
		public nombre_usuario?: string | any ,
    public correo_usuario?: string | any,
    public clave_usuario?: string | any,
    public token?: string
	){}
}

export class RUser{

	constructor(
		public cod_usuario?: string | any ,
		public nombre_usuario?: string | any ,
	){}
}
