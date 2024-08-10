import { CanActivateFn } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {

  let estado:boolean = sessionStorage.getItem('llave') ? true : false;
  return estado

};
