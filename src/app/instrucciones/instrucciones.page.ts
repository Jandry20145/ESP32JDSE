import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-instrucciones',
  standalone: true,
  templateUrl: './instrucciones.page.html',
  styleUrls: ['./instrucciones.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class InstruccionesPage {
  glucosaDescription: string = 'La glucosa es un tipo de azúcar que se encuentra en la sangre y es la principal fuente de energía para el cuerpo. Niveles altos pueden indicar diabetes.';
  colesterolTotalDescription: string = 'El colesterol total mide la cantidad de colesterol en la sangre, incluyendo el colesterol LDL (malo) y HDL (bueno). Niveles altos pueden aumentar el riesgo de enfermedades cardíacas.';
  trigliceridosDescription: string = 'Los triglicéridos son un tipo de grasa en la sangre. Niveles altos pueden ser un indicador de riesgo de enfermedad cardíaca y pancreatitis.';
  indiceMasaCorporalDescription: string = 'El índice de masa corporal (IMC) es una medida que se utiliza para evaluar si una persona tiene un peso saludable en relación con su altura. Un IMC alto puede indicar sobrepeso u obesidad.';

  constructor() { }
}
