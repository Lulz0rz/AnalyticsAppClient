import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Tracking Code</h4>
    </div>
    <div class="modal-body">
    <p>Copy your analytics tracking code into your page body.</p>
    <form class="container-fluid mt-3">
      <textarea readonly class="container-fluid" style="height: 250px;"><script type="text/javascript">
  var _ATC = "{{websiteId}}";
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = '{{trackerUrl}}scripts/analytics.js';
  document.body.appendChild(s);
</script></textarea>
    </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class TrackingCodeModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}