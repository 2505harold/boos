export class LoteMedicion {
  constructor(
    public item: number,
    public nro_banco: any,
    public codigo_medidor: string,
    public codigo_prescinto: string,
    public q3: any,
    public error_q3: any,
    public q2: any,
    public error_q2: any,
    public q1: any,
    public error_q1: any,
    public ensayo_presion: string,
    public fecha_ejecucion: any,
    public certificado: string,
    public estado: string,
    public id_formato: any
  ) {}
}
