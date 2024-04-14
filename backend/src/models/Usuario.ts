import { Rol } from "./Rol";

export class Usuario {
  private IdUsuario: number | undefined;
  private Nombre: string;
  private Apellido: string;
  private Clave: string;
  private Email: string;
  private DNI: string;
  private Direccion: string | undefined;
  private FechaNacimiento: Date | undefined;
  private Telefono: string | undefined;
  private Estado: boolean;
  private oRol: Rol;

  constructor(
    Nombre: string,
    Apellido: string,
    Clave: string,
    Email: string,
    DNI: string,
    Direccion: string,
    FechaNacimiento: Date,
    Telefono: string,
    Estado: boolean,
    oRol: Rol
  ) {
    this.Nombre = Nombre;
    this.Apellido = Apellido;
    this.Clave = Clave;
    this.Email = Email;
    this.DNI = DNI;
    this.Direccion = Direccion;
    this.FechaNacimiento = FechaNacimiento;
    this.Telefono = Telefono;
    this.Estado = Estado;
    this.oRol = oRol;
  }
  //Getters
  public getIdUsuario(): number | undefined {
    return this.IdUsuario;
  }
  public getNombre(): string {
    return this.Nombre;
  }
  public getApellido(): string {
    return this.Apellido;
  }
  public getClave(): string {
    return this.Clave;
  }
  public getEmail(): string {
    return this.Email;
  }
  public getDNI(): string {
    return this.DNI;
  }
  public getDireccion(): string | undefined{
    return this.Direccion;
  }
  public getFechaNacimiento(): Date | undefined{
    return this.FechaNacimiento;
  }
  public getTelefono(): string | undefined{
    return this.Telefono;
  }
  public getEstado(): boolean {
    return this.Estado;
  }
  public getRol(): Rol {
    return this.oRol;
  }
  
  //Setters
  public setIdUsuario(IdUsuario: number | undefined) {
    this.IdUsuario = IdUsuario;
  }
  public setNombre(Nombre: string) {
    this.Nombre = Nombre;
  }
  public setApellido(Apellido: string) {
    this.Apellido = Apellido;
  }
  public setClave(Clave: string) {
    this.Clave = Clave;
  }
  public setEmail(Email: string) {
    this.Email = Email;
  }
  public setDNI(DNI: string) {
    this.DNI = DNI;
  }
  public setDireccion(Direccion: string) {
    this.Direccion = Direccion;
  }
  public setFechaNacimiento(FechaNacimiento: Date) {
    this.FechaNacimiento = FechaNacimiento;
  }
  public setTelefono(Telefono: string) {
    this.Telefono = Telefono;
  }
  public setEstado(Estado: boolean) {
    this.Estado = Estado;
  }
  public setRol(oRol: Rol) {
    this.oRol = oRol;
  }
}
