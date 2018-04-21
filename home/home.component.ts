import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/interval';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ 'opacity': '1' })),
      state('out', style({ 'opacity': '0.8' })),
      transition('* => *', [
        animate(1200)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  private bgImgs: Array<any>;
  private current: number = 1;
  enableAnimation = false;
  currentImage
  state = 'in';
  counter = 1;

  constructor(private sanitize: DomSanitizer) { 
    this.bgImgs = [
      "/assets/img/home1.png",
      "/assets/img/home2.png",
      "/assets/img/home3.png",
      "/assets/img/home4.png"
    ];

    this.currentImage = this.bgImgs[0]
  }

  ngOnInit() {
    Observable.interval(8669)
      .subscribe(x => {
        this.runAnimation();
      })
  }

  runAnimation() {
    this.enableAnimation = true;
    this.counter = 0;
    this.toggleState();
  }

  toggleImg() {
    this.currentImage = this.sanitize.bypassSecurityTrustStyle(`url(${this.bgImgs[this.current]})`);
    this.current == this.bgImgs.length - 1 ? (this.current = 0) : ++this.current;
  }

  onDone($event) {
    if (this.enableAnimation) {
      if (this.counter === 1) {
        this.toggleImg();
      }
      this.toggleState();
    }
  }

  toggleState() {
    if (this.counter < 2) {
      this.state = this.state === 'in' ? 'out': 'in';
      this.counter++;
    }
  }
}
