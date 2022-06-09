import { Injectable } from '@angular/core';
import { Status, LoadsheddingStage, Search, Province, Municipality, 
  Suburb, SearchSuburb, LoadsheddingSchedule, Schedule } from 'eskom-loadshedding-api';

@Injectable({
  providedIn: 'root'
})
export class EskomApiService {

  constructor() { }

  getCurrentStatus(): Promise<LoadsheddingStage> {
    return Status.getStatus()
  }

  getMunicipalitiesByProvince(province: Province): Promise<Municipality[]> {
    return Search.getMunicipalities(province)
  }

  searchSuburbs(searchTerm:string): Promise<SearchSuburb[]> {
    return Search.searchSuburbs(searchTerm);
  }

  searchSuburbsInMunicipality(municipalityId: number, searchTerm?: string): Promise<Suburb[]> {
    return Search.getMunicipalitySuburbs(municipalityId, searchTerm)
  }

  getSuburbSchedule(suburbId: number, loadsheddingStage: LoadsheddingStage): Promise<LoadsheddingSchedule> {
    return Schedule.getSchedule(suburbId, loadsheddingStage)
  }

  getFullSuburbSchedule(suburbId: number): Promise<LoadsheddingSchedule[]> {
    return Schedule.getFullSchedule(suburbId)
  }

}
