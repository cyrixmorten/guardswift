import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GPSData, Tracker } from '@gs/shared/parse/subclass-util';
import { firstValueFrom, Observable } from 'rxjs';
import * as pako from 'pako';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GpsTrackService {
  
  constructor(private httpClient: HttpClient) {}

  public gpsData= new BehaviorSubject<GPSData[]>([]);
  
  public async setTrack(track: Tracker) {
    
    const response: Blob = await firstValueFrom(this.httpClient.get(track.gpsFile.url({forceSecure: true}), {
      responseType: 'blob'
    }))

    const arrayBuffer = await response.arrayBuffer();

    const gpsDataString = pako.ungzip(arrayBuffer, { to: 'string' });

    this.gpsData.next(JSON.parse(gpsDataString));
  }

}


