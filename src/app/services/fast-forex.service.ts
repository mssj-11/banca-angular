import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environtment';

@Injectable({
  providedIn: 'root'
})
export class FastForexService {

  constructor(private http: HttpClient) { }

  getExchangeRate(from: string, to: string) {
    return this.http.get(`${environment.fastforex.apiUrl}/fetch-one?from=${from}&to=${to}&api_key=${environment.fastforex.apiKey}`);
  }

  getCurrencies() {
    return this.http.get(`${environment.fastforex.apiUrl}/currencies?api_key=${environment.fastforex.apiKey}`);
  }
}