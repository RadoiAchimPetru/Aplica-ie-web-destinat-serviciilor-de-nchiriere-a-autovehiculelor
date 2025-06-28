import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']
})
export class SearchCarComponent {
  searchCarForm!: FormGroup;
  isSpinning = false;
  cars: any[] = [];
  searchKeyword: string = '';
  searchResults: any[] = [];

  listOfBrands = ['BMW', 'AUDI', 'TESLA', 'TOYOTA', 'HONDA', 'NISSAN'];
  listOfTypes = ['Petrol', 'Hybrid', 'Diesel', 'Electric'];
  listOfColor = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Silver'];
  listOfTransmissions = ['Manual', 'Automatic'];

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null]
    });
  }

  // Căutare pe keyword simplu
  onSearchKeyword() {
    this.isSpinning = true;
    this.customerService.searchKeyword(this.searchKeyword).subscribe({
      next: (res: any) => {
        this.searchResults = res;
        this.isSpinning = false;
      },
      error: (err) => {
        console.error("Eroare la căutare keyword:", err);
        this.isSpinning = false;
      }
    });
  }

  // Căutare avansată pe formă
  searchCar() {
    const raw = this.searchCarForm.value;

  const payload = {
    brand:        raw.brand?.trim()        || null,
    type:         raw.type                 || null,
    transmission: raw.transmission         || null,
    color:        raw.color                || null
  };
    this.cars = [];
    this.isSpinning = true;
    this.customerService.searchCar(payload).subscribe({
    next: res => {
      this.isSpinning = false;
      res.forEach((c: any) => {                 // ← după fix backend nu mai există carDTOList
        c.processedImg = 'data:image/jpeg;base64,' + c.returnedImage;
        this.cars.push(c);
      });
    },
    error: err => {
      console.error('Eroare la căutare avansată:', err);
      this.isSpinning = false;
    }
  });
}
}
