import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skill } from './skill.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SkillService {
  constructor(private http: HttpClient) {}

  skills: Skill[];
  skill: Skill;

  findAll() : Observable<any>{
    return this.http.get('http://localhost:8080/api/skill/') 
  }

  
  setSkill(skill) {
    this.skill = skill;
  }
  
  setSkills(skills) {
    this.skills = skills;
  }

  getSkills() {
    return this.skills;
  }

  createSkill(skill: Skill) {
    return this.http
      .post<Skill>('http://localhost:8080/api/skill/', skill)
  }

  deleteSkill(name){
    return this.http
      .delete<Skill>('http://localhost:8080/api/skill/'+name)
  }




}
