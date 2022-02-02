import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async create(project: CreateProjectInput) : Promise<Project>{
    let newProject = this.projectRepository.create(project);

    return await this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({relations:["employees"]});
  }

  async findOne(id: string): Promise<Project> {
    return await this.projectRepository.findOne(id,{relations:["employees"]});
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
