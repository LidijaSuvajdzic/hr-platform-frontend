
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skill } from '../skill/skill.model';
import { CandidateSkill } from './candidateSkill.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CandidateSkillService {
  constructor(private http: HttpClient) {}

  skills: Skill[];
  skill: Skill;

  
  setSkill(skill) {
    this.skill = skill;
  }
  
  removeSkill(removeCandidateSkill : CandidateSkill) {
     const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: removeCandidateSkill,
    };
    return this.http
      .delete('http://localhost:8080/api/candidateSkills/', options)
  }

  
  

}
