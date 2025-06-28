import { Component, OnInit } from '@angular/core'
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
open: any
  constructor(private service: CustomerService) {}

  cars: any[] = []

  ngOnInit() {
    this.getAllCars()
  }

  getAllCars() {
    this.service.getAllCars().subscribe(res => {
      res.forEach((car: any) => {
        car.processedImage = `data:image/jpeg;base64,${car.returnedImage}`
        this.cars.push(car)
      })
    })
  }
}
