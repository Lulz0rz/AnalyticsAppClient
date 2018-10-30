import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { groupBy, forIn, orderBy } from 'lodash';

import { EventsService } from '../services/events.service';
import { Event } from '../models/event';
import { BrowserTypes, PlatformTypes } from '../models/enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: Event[] = [];
  pages: any = [] = [];

  browserChartLabels: string[] = [];
  browserChartData: number[] = [];
  platformChartLabels: string[] = [];
  platformChartData: number[] = [];

  lineChartData: Array<any> = [
    {data: [], label: 'Page Hits'}
  ];

  lineChartLabels:Array<any> = [];
  lineChartOptions:any = {
    responsive: true
  };

  constructor(private route: ActivatedRoute, private eventsService: EventsService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.eventsService.get(id).subscribe((data: any) => {
      this.events = data.events;
      this.visitorsLineChartInit();
      this.orderPages();
      this.browserPieChartInit();
      this.platformPieChartInit();
    });
  }

  orderPages(maxToShow = 8) {
   let pages = groupBy(this.events, i => i.pageTitle);

    forIn(pages, (value, key) => {
      this.pages.push({ pageTitle: key, count: value.length });
    });

    this.pages = orderBy(this.pages, 'count', 'desc').slice(0, maxToShow);
  }

  visitorsLineChartInit() {
    let visitors = groupBy(this.events, i => moment(i.created).startOf('day').format('MMM DD'));

    forIn(visitors, (value, key) => {
      this.lineChartLabels.push(key);
      this.lineChartData[0].data.push(value.length);
    });
  }

  browserPieChartInit() {
    let browsers = groupBy(this.events, i => i.browser);

    forIn(browsers, (value, key) => {
      this.browserChartLabels.push(BrowserTypes[key]);
      this.browserChartData.push(value.length);
    });
  }

  platformPieChartInit() {
    let platforms = groupBy(this.events, i => i.platform);
    
    forIn(platforms, (value, key) => {
      this.platformChartLabels.push(PlatformTypes[key]);
      this.platformChartData.push(value.length);
    });

  }

}