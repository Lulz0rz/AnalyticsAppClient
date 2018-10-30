import { Component, OnInit, Input } from '@angular/core';
import { WebsitesService } from '../services/websites.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../environments/environment';
import { TrackingCodeModalContent } from './modal.component';
import { CreateWebsite } from '../models/website';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  websites: any = [];
  loaded: boolean = false;
  showCreate: boolean = false;
  website: CreateWebsite;

  constructor(private websitesService: WebsitesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.website = new CreateWebsite();
    
    this.websitesService.get().subscribe(websites => {
      this.loaded = true;
      this.websites = websites;
    });
  }

  open(websiteId) {
    const modal = this.modalService.open(TrackingCodeModalContent);
    modal.componentInstance.websiteId = websiteId;
    modal.componentInstance.trackerUrl = environment.trackerUrl;
  }

  createNew(event) {
    event.preventDefault();
    this.showCreate = !this.showCreate;
  }

  delete(name, websiteId) {
    const confirm = window.confirm(`Are you sure you wish to delete the website ${name}?`);

    if (confirm === true) {
      this.websitesService.delete(websiteId).subscribe(deleted => {
        this.websites = this.websites.filter(item => item.websiteId === deleted.websiteId); // filter out deleted website from list
      });
    }
  }

  onSubmit() {
    this.websitesService.create(this.website).subscribe(website => {
      this.websites.push(website);
    });
  }

}