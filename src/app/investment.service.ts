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

  async getInvestmentLocationById(id: number): Promise<Investment | undefined> {
    const data = await fetch(`${this.url}/investment/${id}`);
    return await data.json() ?? {};
  }

  async submitEditInvestment(investmentData: { entreprise: any; ville: any; id: number | undefined; titreoperation: any }): Promise<Investment>  {
 console.log("investmentData", investmentData);
 const id = investmentData.id
    console.log("id", id);
    return fetch(`${this.url}/investments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(investmentData)
    }).then(response => response.json());
  }

}
