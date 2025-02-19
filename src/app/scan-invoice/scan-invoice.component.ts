import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ScanphotoService } from '../services/scanphoto.service';

@Component({
  selector: 'app-scan-invoice',
  templateUrl: './scan-invoice.component.html',
  styleUrls: ['./scan-invoice.component.css']
})
export class ScanInvoiceComponent implements OnInit {

  constructor(
    private _scanPhoto: ScanphotoService,
    private modalService: NgbModal) { }

  // toggle webcam on/off
  public showWebcam = true;
  public captureImageData = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {};
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
    .then((MediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = MediaDevices && MediaDevices.length > 1;
    });
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.toggleWebcam();
    open();
  }

  public showNextWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(image){
    console.log('recieved webcam image', image);
    console.log('route activated!')
    let data = {
      orgId: 1,
      image: image,
    }
    console.log('DATA OBJECT TO BE SENT TO SERVICE', data);
    this._scanPhoto.scanPhoto(data).then(subData => {
      console.log('Subscribe Data', subData);
    });
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  // open() {
  //   const modalRef = this.modalService.open(ScanInvoiceModal);
  //   modalRef.componentInstance.name = 'invoice';
  // }

}
