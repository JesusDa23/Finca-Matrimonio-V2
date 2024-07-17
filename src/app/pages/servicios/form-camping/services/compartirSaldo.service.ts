import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartirSaldoService {
    saldoTotal: any;

    setSaldo( saldo: any){
        this.saldoTotal = saldo
    }

    getSaldo():any{
        return this.saldoTotal
    }
}
