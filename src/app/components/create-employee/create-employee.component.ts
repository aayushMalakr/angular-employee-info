import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy{
  public employee!: Employee;
  private apiSubcription!: Subscription;
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: EmployeeService
  ){}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    })  

    this.myForm.valueChanges.subscribe();
  }

  onSubmit(): void {
    this.employee = {
      employee_name: this.myForm.get('name')?.value,
      employee_age: this.myForm.get('name')?.value,
      employee_salary: this.myForm.get('name')?.value,
    }
    this.apiSubcription = this.httpService.createEmployee(this.employee).subscribe();
  }

  ngOnDestroy(): void {
    if (this.apiSubcription) {
      this.apiSubcription.unsubscribe();
    }
  }
}
