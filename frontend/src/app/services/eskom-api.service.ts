import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Status,
  LoadsheddingStage,
  Search,
  Province,
  Municipality,
  Suburb,
  SearchSuburb,
  LoadsheddingSchedule,
  Schedule,
} from 'eskom-loadshedding-api';
import { Observable } from 'rxjs';

const baseUrl = 'http://10.1.0.254:3000';

@Injectable({
  providedIn: 'root',
})
export class EskomApiService {
  constructor(private http: HttpClient) {}

  getCurrentStatus(): Observable<any> {
    
    return this.http.get(`${baseUrl}/getCurrentStatus`);
  }

  getMunicipalitiesByProvince(province: Province): Observable<any> {
    return this.http.get(`${baseUrl}/getMunicipalitiesByProvince/${province}`);
  }

  searchSuburbs(searchTerm: string): Observable<any> {
    return this.http.get(`${baseUrl}/searchSuburbs/${searchTerm}`);
  }

  searchSuburbsInMunicipality(
    municipalityId: number,
    searchTerm?: string
  ): Observable<any> {
    return this.http.get(
      `${baseUrl}/searchSuburbsInMunicipality/${municipalityId}/${searchTerm}`
    );
  }

  getSuburbSchedule(
    suburbId: number,
    loadsheddingStage: LoadsheddingStage
  ): Observable<any> {
    return this.http.get(
      `${baseUrl}/getSuburbSchedule/${suburbId}/${loadsheddingStage}`
    );
  }

  getFullSuburbSchedule(suburbId: number): Observable<any> {
    return this.http.get(`${baseUrl}/getFullSuburbSchedule/${suburbId}`);
  }

  // ESKOM LOADSHEDDING API

  // getCurrentStatus(): Promise<LoadsheddingStage> {
  //   return Status.getStatus()
  // }

  // getMunicipalitiesByProvince(province: Province): Promise<Municipality[]> {
  //   return Search.getMunicipalities(province)
  // }

  // searchSuburbs(searchTerm:string): Promise<SearchSuburb[]> {
  //   return Search.searchSuburbs(searchTerm);
  // }

  // searchSuburbsInMunicipality(municipalityId: number, searchTerm?: string): Promise<Suburb[]> {
  //   return Search.getMunicipalitySuburbs(municipalityId, searchTerm)
  // }

  // getSuburbSchedule(suburbId: number, loadsheddingStage: LoadsheddingStage): Promise<LoadsheddingSchedule> {
  //   return Schedule.getSchedule(suburbId, loadsheddingStage)
  // }

  // getFullSuburbSchedule(suburbId: number): Promise<LoadsheddingSchedule[]> {
  //   return Schedule.getFullSchedule(suburbId)
  // }
}
