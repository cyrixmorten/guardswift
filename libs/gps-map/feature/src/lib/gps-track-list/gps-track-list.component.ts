import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GpsTrackService } from '@gs/gps-map/state';
import { Tracker, TrackerQuery } from '@gs/shared/parse/subclass-util';


@Component({
  selector: 'gs-gps-track-list',
  template: ` 
    <div class="flex flex-col h-full w-38">
      <div class="p-2"> 
        <mat-form-field appearance="fill">
          <mat-label>Søg</mat-label>
          <input matInput type="text" [(ngModel)]="searchValue">
          <button [style.visibility]="searchValue ? 'visible': 'hidden'" matSuffix mat-icon-button aria-label="Clear" (click)="searchValue=''">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>
      </div>
      <mat-list class="flex-grow tracker-list">
        <cdk-virtual-scroll-viewport 
            [itemSize]="20" 
            class="h-full">
            <mat-list-item
              *cdkVirtualFor="let gpsTrack of gpsTracks | orderBy: '-createdAt' | filterBy: ['guard.name']: [searchValue]; let odd = odd;"
              [class.alternate]="odd"
              [class.selected]="this.selectedTrack && gpsTrack.id === this.selectedTrack.id"
              (click)="selectTrack(gpsTrack)"
              class="hover:cursor-pointer h-16"
              matRipple>
                <gs-gps-track-entry class="w-full" [tracker]="gpsTrack"></gs-gps-track-entry>
            </mat-list-item>
        </cdk-virtual-scroll-viewport>
      </mat-list>
    </div>
  `,
  styles: [`
    .tracker-list .mat-list-item {
      height: auto;
    }
    .alternate {
      background: rgba(127, 127, 127, 0.1);
    }
    .selected {
      background: rgba(127, 127, 127, 0.2);
      font-weight: bold;
    }
  `],
})
export class GpsTrackListComponent implements OnInit {

  public searchValue = '';

  public gpsTracks: Tracker[] = [];
  public selectedTrack!: Tracker;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  private cdkVirtualScrollViewport: CdkVirtualScrollViewport | undefined;
  
  constructor(private gpsTrackService: GpsTrackService) {}
  
  ngOnInit() {
    this.performQuery();
  }

  selectTrack(track: Tracker) {
    this.selectedTrack = track;

    this.gpsTrackService.setTrack(track);
  }

  async performQuery() {
    this.gpsTracks = await new TrackerQuery().include('guard').build().descending("createdAt").find();

    this.cdkVirtualScrollViewport?.checkViewportSize()
  }
}
