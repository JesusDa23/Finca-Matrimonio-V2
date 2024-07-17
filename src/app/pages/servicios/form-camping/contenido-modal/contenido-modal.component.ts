import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-contenido-modal',
  templateUrl: './contenido-modal.component.html',
  styleUrl: './contenido-modal.component.css'
})
export class ContenidoModalComponent {
  @Input() totalPagar: number | undefined;
};
