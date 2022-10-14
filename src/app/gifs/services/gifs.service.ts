import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGiftResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private url: string = `https://api.giphy.com/v1/gifs/search?`;
  private apiKey: string = `api_key=eNIHhPG96XPf1BkA91F0TaEuDkP3coBP&q=`;
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { 

    if( localStorage.getItem('historial') ) {
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }   
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }



    this.http.get<SearchGiftResponse>(this.url + this.apiKey + query).subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;

    });

  }

}
