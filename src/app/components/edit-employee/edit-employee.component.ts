import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnDestroy{
  public employee!: Employee;
  private apiSubcription!: Subscription;
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private httpService: EmployeeService
  ){}

  createForm(): void {  
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    })

    this.myForm.setValue({
      name: this.employee.employee_name,
      age: this.employee.employee_age,
      salary: this.employee.employee_salary,
    });
    
    this.myForm.valueChanges.subscribe();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if(id) {
      this.apiSubcription = this.httpService.getEmployeeById(id).subscribe((emp)=>{ 
        this.employee = emp.data;
        this.createForm();
      });
    }
  }

  onSubmit() {
    if(this.employee.id) {
      this.apiSubcription = this.httpService.updateEmployee(this.employee.id, this.employee).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.apiSubcription) {
      this.apiSubcription.unsubscribe();
    }
  }
}
