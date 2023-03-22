import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from './candidate.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  constructor(private http: HttpClient) {}

  candidates: Candidate[] =[];
  candidate: Candidate;

  findAll() : Observable<any>{
    return this.http.get('http://localhost:8080/api/candidates/') 
  }

  findByUUID(uuid) : Observable<any>{
    return this.http.get('http://localhost:8080/api/candidates/'+uuid) 
  }

  findAllByName(name) : Observable<any>{
    return this.http.get('http://localhost:8080/api/candidates/byName/'+ name) 
  }

  searchAllBySkills(skills) : Observable<any>{
    return this.http.post('http://localhost:8080/api/candidates/bySkills/', skills) 
  }

  setCandidates(candidates) {
    this.candidates = candidates;
  }

  setCandidate(candidate) {
    this.candidate = candidate;
  }

  getCandidates() {
    return this.candidates;
  }


  createCandidate(candidate: Candidate) {
    return this.http
      .post<Candidate>('http://localhost:8080/api/candidates/', candidate)
  }

  updateCandidate(candidate: Candidate) {
    return this.http
      .put<Candidate>('http://localhost:8080/api/candidates/', candidate)
  }

  deleteCandidate(uuid){
    return this.http
      .delete<Candidate>('http://localhost:8080/api/candidates/'+uuid)
  }

}
