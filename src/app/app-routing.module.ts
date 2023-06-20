import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  },
  {
    path: 'edit/:id',
    component: EditEmployeeComponent
  },
  // {
  //   path: 'create-employee',
  //   component: CreateEmployeeComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
