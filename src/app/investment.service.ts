import { Injectable } from '@angular/core';
import {Investment} from "./investment";

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  url = 'http://127.0.0.1:8000/api';

  async getAllInvestmentLocations(): Promise<Investment[]> {
    const data = await fetch(`${this.url}/investments`);
    return await data.json() ?? []
  }

  async getFilteredInvestments(filters: { ville?: string; etatAvancement?: string }): Promise<Investment[]> {
    let queryParams = [];

    if (filters.ville) {
      queryParams.push(`ville=${encodeURIComponent(filters.ville)}`);
    }

    if (filters.etatAvancement) {
      queryParams.push(`etatAvancement=${encodeURIComponent(filters.etatAvancement)}`);
    }

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    const response = await fetch(`${this.url}/investments/${queryString}`);

    return await response.json() ?? [];
  }

  async getInvestmentLocationById(id: number): Promise<Investment | undefined> {
    const data = await fetch(`${this.url}/investment/${id}`);
    return await data.json() ?? {};
  }

  async submitEditInvestment(investmentData: { entreprise: any; ville: any; id: number | undefined; titreoperation: any }): Promise<Investment>  {
    const id = investmentData.id
    return fetch(`${this.url}/investment/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(investmentData)
    }).then(response => response.json());
  }

}
