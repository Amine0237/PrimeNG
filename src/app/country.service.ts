import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor() {}

  getCountries(): Promise<any[]> {
    // Hardcoded list of countries for temporary use
    const countries = [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'Andorra', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Armenia', code: 'AM' },
      { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' },
      { name: 'Azerbaijan', code: 'AZ' }
      // Add more countries as needed
    ];
    
    return Promise.resolve(countries);
  }
}
