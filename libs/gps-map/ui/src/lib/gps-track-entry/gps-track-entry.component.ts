import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Tracker } from '@gs/shared/parse/subclass-util';

@Component({
  selector: 'gs-gps-track-entry',
  template: ` 
    <div *ngIf="trackerData">
      <div class="flex text-sm font-light">
        <div>{{ trackerData.createdAt | timeAgo}}</div>
        <div class="grow"></div>
        <div>{{duration}}</div>
      </div>
      <div class="flex flex-col">
        <div>{{ trackerData.guard.name}}</div>
      </div>
      <div class="flex text-sm font-light">
        <div>{{ startDate | date:'shortDate'}}</div>
        <div>&nbsp;-&nbsp;</div>
        <div>{{ endDate | date:'shortDate'}}</div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GpsTrackEntryComponent {

  public trackerData: Tracker | undefined;
  public startDate: Date = new Date();
  public endDate: Date = new Date();
  public duration = '';

  @Input() set tracker(trackerData: Tracker) {
    this.trackerData = trackerData;

    const { start, end } = trackerData; 

    this.startDate = start;
    this.endDate = end;

    const durationMs = end.getTime() - start.getTime();
    this.duration = this.parseMillisecondsIntoReadableTime(durationMs)
  };
    
  // https://stackoverflow.com/a/33909506
   parseMillisecondsIntoReadableTime(milliseconds: number): string {
    //Get hours from milliseconds
    const hours = milliseconds / (1000*60*60);
    const absoluteHours = Math.floor(hours);
    const h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60;
    const absoluteMinutes = Math.floor(minutes);
    const m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60;
    const absoluteSeconds = Math.floor(seconds);
    const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  
    return h + ':' + m + ':' + s;
  }


}
