import { Component, inject, Injectable } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  str = '';
  result: number = 0;
  calcService = inject(StringCalculatorService);

  onSubmit() {
    this.result = this.calcService.add(this.str);
  }
}

@Injectable({
  providedIn: 'root',
})
export class StringCalculatorService {
  add(numbers: string): number {
    if (!numbers) return 0;
    let sum = 0;
    numbers.split(",").map(x => sum += +x);
    return sum;
  }
}
