import { Body } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Resolver(()=>Employee)
export class EmployeeResolver {
  constructor(private employeeService:EmployeeService){}
  @Query(() => [Employee],{name:"getAllEmployee"})
  findAll() {
   return this.employeeService.findAll()
  }

  @Mutation(()=>Employee,{name:"createEmployee"})
  create(@Args('employee') employee:EmployeeCreateDto ){
   return this.employeeService.create(employee)
  }
  @ResolveField(()=>Project)
  project(@Parent() employe:Employee){
   return this.employeeService.getProject(employe.projectId)
  }
}
