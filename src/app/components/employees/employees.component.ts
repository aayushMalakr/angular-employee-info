import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  public employees!: Array<Employee>;
  private apiSubcription!: Subscription;

  constructor(
    private httpService: EmployeeService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.apiSubcription = this.httpService.getAllEmployees().subscribe((response)=>{
      this.employees = response.data;
    })
  }

  deleteEmployee(id: any) {
    if(id) {
      this.apiSubcription = this.httpService.deleteEmployees(id).subscribe();
    }
  }
  
  ngOnDestroy(): void {
    if (this.apiSubcription) {
      this.apiSubcription.unsubscribe();
    }
  }
}
