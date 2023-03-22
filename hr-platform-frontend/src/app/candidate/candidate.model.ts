import * as UUID from 'uuid';
import { Skill } from '../skill/skill.model';

export class Candidate {
  uuid: UUID;
  name: string;
    email: string;
    dateOfBirth: Date;
    phoneNumber: string;
    skills: Skill[];
    opened: boolean=false;

    constructor() {}
  }