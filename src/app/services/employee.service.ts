import { Injectable } from '@angular/core';
import { APIResponse, Employee } from '../shared/models/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employee!: Array<Employee>

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<APIResponse<Employee>>  {
    return this.http.get<any>('https://dummy.restapiexample.com/api/v1/employees');
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`https://dummy.restapiexample.com/api/v1/employee/${id}`);
  }

  createEmployee(employee:Employee): Observable<any> {
    console.log(employee,' employee data has been posted ')
    return this.http.post<any>('https://dummy.restapiexample.com/api/v1/create', employee);
  } 

  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put<any>(`https://dummy.restapiexample.com/update/${id}`, employee);
  }

  deleteEmployees(id: number): Observable<any> {
    return this.http.delete<any>(`https://dummy.restapiexample.com/api/v1/delete/${id}`);
  }
}
