import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GPSData, Tracker } from '@gs/shared/parse/subclass-util';
import { firstValueFrom } from 'rxjs';
import * as pako from 'pako';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GpsTrackService {
  
  constructor(private httpClient: HttpClient) {}

  public tracker = new BehaviorSubject<Tracker | undefined>(undefined);
  public gpsData= new BehaviorSubject<GPSData[]>([]);
  
  public async setTrack(track: Tracker) {
    this.emitTracker(track);
    this.emitUnzippedGPSData(track);
  }

  public emitTracker(track: Tracker) {
    this.tracker.next(track)
  }

  public async emitUnzippedGPSData(track: Tracker) {
    const response: Blob = await firstValueFrom(this.httpClient.get(track.gpsFile.url({forceSecure: true}), {
      responseType: 'blob'
    }))

    const gpsDataString = pako.ungzip(await response.arrayBuffer(), { to: 'string' });

    this.gpsData.next(JSON.parse(gpsDataString));
  }
}