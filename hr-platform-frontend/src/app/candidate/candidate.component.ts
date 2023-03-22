import { Component, OnInit } from '@angular/core';
import { Candidate } from './candidate.model'
import { CandidateService } from './candidate.service'
import { CandidateSkillService } from '../candidate-skill/candidate-skill.service'
import { CandidateSkill } from '../candidate-skill/candidateSkill.model';
import { Skill } from '../skill/skill.model';
import { SkillService } from '../skill/skill.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  
  candidates: Candidate[];
  candidate: Candidate = new Candidate();
  name: String = '';
  showModal: String = '';
  allSkills: Skill[] ;
  searchedSkills: String;
  removeCandidateSkill: CandidateSkill = new CandidateSkill();

  constructor(private candidateService: CandidateService,private candidateSkillService: CandidateSkillService, private skillService: SkillService) {}

  toggleDetails(index) {
    this.candidates[index].opened = !this.candidates[index].opened;
  }
  
  openCreateModal() {
    this.showModal = 'create'
  }

  openCandidateSkills(candidate){
    this.candidate = candidate
    this.candidate.opened = !this.candidate.opened
  }

  openUpdateModal(candidate) {
    this.candidate = candidate
    this.showModal = 'update'
    this.findByUUID(this.candidate.uuid)
  }   


  deleteCandidate(candidate) {
    this.candidate = candidate
    this.candidateService.deleteCandidate(this.candidate.uuid)
    .subscribe(response => {
        if(response) {
          this.candidates = this.candidates.filter(candidate => candidate.uuid != response.uuid)
        }
    });
  }

  searchCandidateBySkills(){
      let skills = this.searchedSkills.split(",")
      this.candidateService.searchAllBySkills(skills)
      .subscribe(response =>{
          this.candidates = response
      });
  }

  searchCandidateByName() {
    if(this.name.trim() != '') {
      this.candidateService.findAllByName(this.name)
      .subscribe(
        (response) => {                         
          this.candidates = response; 
        })
    }else{
      this.findAll()
    }
  }

  onRemoveSkill(skill,candidate) {
    this.removeCandidateSkill.candidateUuid = candidate.uuid
    this.removeCandidateSkill.skillName = skill.name
    this.candidateSkillService.removeSkill(this.removeCandidateSkill)
    .subscribe(() => {
      let skill = this.candidate.skills.find(s => s.name === this.removeCandidateSkill.skillName)
      this.candidate.skills.splice(this.candidate.skills.indexOf(skill) ,1)
    });
  }

  onUpdateCandidate() {
   this.candidate.skills = this.allSkills.filter(skill => skill.checked == true)
   this.candidateService.updateCandidate(this.candidate)
      .subscribe(response => {
        this.candidate = response
        this.findAll();
      })
  }

  clearAll() {
    this.findAll();
  }

  createCandidate() {
    this.candidateService.createCandidate(this.candidate)
    .subscribe(candidate => {
      this.candidates.push(candidate);
    });
    this.showModal= '';
    }

  onBack() {
    this.showModal = '';
  }

  ngOnInit() {
    this.findAll();
    this.findAllSkills();
  }

  private findAll() {
    this.candidateService.findAll()
    .subscribe(
      (response) => {                         
        this.candidates = response; 
      })
  }
  private findAllSkills() {
    this.skillService.findAll()
    .subscribe(
      (response) => {                         
        this.allSkills = response; 
      })
  }
  private findByUUID(uuid) {
    this.candidateService.findByUUID(uuid)
    .subscribe(
      (response) => {                         
        this.candidate = response; 
      })
  }

  }
