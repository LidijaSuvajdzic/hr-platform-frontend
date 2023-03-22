import { Component, OnInit } from '@angular/core';
import { Skill } from './skill.model';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skills: Skill[];
  skill: Skill = new Skill();
  showCreateModal: boolean = false; 
  constructor(private skillService: SkillService) {}

  onDeleteSkill(name) {
    this.skillService.deleteSkill(name)
    .subscribe(response => {
      if(response) {
        this.skills = this.skills.filter(skill => skill.name != response.name);
      }
      });
  }

    openCreateModal() {
    this.showCreateModal = true;
  }
    onSubmit() {
    this.skillService.createSkill(this.skill)
    .subscribe(skill => {
      this.skills.push(skill);
    });
    this.showCreateModal= false;
    this.findAll();
    }

  onSelectionChange(skill: Skill) {
    this.skill = skill;
  }
  
  ngOnInit() {
    this.findAll();
  }

  private findAll() {
    this.skillService.findAll()
    .subscribe(
      (response) => {                         
        this.skills = response; 
      })
  }
}
