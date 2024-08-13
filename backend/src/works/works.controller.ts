import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WorksService } from './works.service';


@Controller('works')
export class WorksController {
    constructor(private readonly worksService: WorksService) {

    }

    @Get()
    findAll() {
        return this.worksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.worksService.create(id);
    }

    @Post()
    create(@Body() createWorkDto: any) {
      return this.worksService.create(createWorkDto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateWorkDto: any) {
      return this.worksService.update(id, updateWorkDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.worksService.remove(id);
    }
  }