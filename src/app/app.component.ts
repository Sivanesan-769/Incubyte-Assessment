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

    // Step 3 Allow the add method to handle new lines between numbers (instead of commas). ("1\n2,3" should return 6)
    numbers = numbers.replace('\n', ',');
    let numbersArray = numbers.split(/[\n,]+/);
    const parsedNumbers = numbersArray.map(num => parseInt(num, 10)).filter(num => !isNaN(num));
    sum = parsedNumbers.reduce((total, num) => total + num, 0);
    // Step 3 End Block

    // Step 5 Calling add with a negative number will throw an exception: "negative numbers not allowed <negative_number>".
    let negativeNumbers: number[] = [];
    for(const numStr of parsedNumbers) {
      if(numStr < 0) {
        negativeNumbers.push(numStr);
      }
    }

    if(negativeNumbers.length) {
      throw new Error(`negative numbers not allowed: ${negativeNumbers.join(',')}`);
    }
    // Step 5 End Block

    return sum;
  }
}
