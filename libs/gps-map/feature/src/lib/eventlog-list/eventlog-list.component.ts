import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { GpsTrackService } from '@gs/gps-map/state';
import { EventLog, EventLogQuery, TaskEvent, Tracker } from '@gs/shared/parse/subclass-util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gs-eventlog-list',
  template: `
    <div class="flex flex-col h-full">
      <mat-toolbar class="mat-elevation-z2" style="z-index: 800">
        <span>Ankomst tidspunkter</span>
      </mat-toolbar>
      <mat-list class="flex-grow">
        <cdk-virtual-scroll-viewport
            [itemSize]="20"
            class="w-full h-full">
            <mat-list-item
              *cdkVirtualFor="let eventLog of eventLogs | orderBy: 'deviceTimestamp'; let odd = odd;"
              [class.alternate]="odd"
              [class.selected]="this.selectedEventlog && eventLog.id === this.selectedEventlog.id"
              (click)="selectEventlog(eventLog)"
              class="hover:cursor-pointer"
              matRipple>
                <div class="flex w-full">
                  <div class="text-sm font-light w-12">
                    {{eventLog.deviceTimestamp | date:'HH:mm'}}
                  </div>
                  <div>{{eventLog.clientName}}</div>
                </div>
            </mat-list-item>
        </cdk-virtual-scroll-viewport>
      </mat-list>
    </div>
  `,
  styles: [`
    .alternate {
      background: rgba(127, 127, 127, 0.1);
    }
    .selected {
      background: rgba(127, 127, 127, 0.2);
      font-weight: bold;
    }
  `],
})
export class EventlogListComponent implements OnInit, OnDestroy {

  @Output() eventlog = new EventEmitter<EventLog>();

  private subscription = new Subscription();

  public eventLogs: EventLog[] = [];
  public selectedEventlog!: EventLog;

  constructor(private gpsTrack: GpsTrackService) {}

  ngOnInit(): void {
    this.observeTrackerSelection();
  }

  selectEventlog(eventlog: EventLog) {
    this.selectedEventlog = eventlog;
    this.eventlog.emit(eventlog);
  }

  observeTrackerSelection() {
    this.subscription.add(
      this.gpsTrack.tracker.subscribe((tracker: Tracker | undefined) => {
          if (tracker) {
              this.queryEventsForTrack(tracker);
          }
      })
    )
  }

  private async queryEventsForTrack(tracker: Tracker) {
    this.eventLogs = await new EventLogQuery()
      .createdAfter(tracker.start, EventLog._deviceTimestamp)
      .createdBefore(tracker.end, EventLog._deviceTimestamp)
      .matchingTaskEvent(TaskEvent.ARRIVE)
      .matchingGuard(tracker.guard)
      .build().limit(9999).find();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
