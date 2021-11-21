import { Component, OnInit } from '@angular/core';
import { Pad } from 'src/app/interfaces/pad.inteface';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  sub!: Subscription;
  pads: Pad[] = [];
  activePads: any[] = [];
  pageTitle: string = 'Grooveo';
  isPlaying: boolean = false;

  constructor() {
    this.pads = [
      {
        id: 1,
        name: 'future_funk_beats',
        fileUrl: '120_future_funk_beats_25.mp3',
        state: false,
      },
      {
        id: 2,
        name: 'stutter_breakbeats',
        fileUrl: '120_stutter_breakbeats_16.mp3',
        state: false,
      },
      {
        id: 3,
        name: 'Bass Warwick',
        fileUrl: 'Bass Warwick heavy funk groove on E 120 BPM.mp3',
        state: false,
      },
      {
        id: 4,
        name: 'electric guitar',
        fileUrl: 'electric guitar coutry slide 120bpm - B.mp3',
        state: false,
      },
      {
        id: 5,
        name: 'Stompy Slosh',
        fileUrl: 'FUD_120_StompySlosh.mp3',
        state: false,
      },
      {
        id: 6,
        name: 'Tanggu',
        fileUrl: 'GrooveB_120bpm_Tanggu.mp3',
        state: false,
      },
      {
        id: 7,
        name: 'Perc',
        fileUrl: 'MazePolitics_120_Perc.mp3',
        state: false,
      },
      {
        id: 8,
        name: 'Pas Groove',
        fileUrl: 'PAS3GROOVE1.03B.mp3',
        state: false,
      },
      {
        id: 9,
        name: 'Organ Synth',
        fileUrl: 'SilentStar_120_Em_OrganSynth.mp3',
        state: false,
      },
    ];
  }

  ngOnInit(): void {}

  changePadState(padObj: Pad) {
    let index = this.pads.findIndex((pad) => {
      return pad.id === padObj.id;
    });
    this.pads[index] = padObj;

    if (!padObj.state) {
      if (this.activePads.length) {
        let index = this.activePads.findIndex((pad) => {
          return pad.pad.id === padObj.id;
        });
        this.activePads[index]?.audio.pause();
        // if (index > -1) {
        //   this.activePads.splice(index, 1);
        // }
      }
    }
  }

  play() {
    this.sub = timer(0, 8000).subscribe(() => {
      const prefixUrl = '/assets/';
      this.isPlaying = true;
      const padsArr: Pad[] = this.getActivePads();
      padsArr.forEach((pad, i) => {
        let audio = new Audio(prefixUrl + pad.fileUrl);
        this.activePads.push({
          pad,
          audio,
        });
        this.activePads[i].audio.play();
      });
    });
  }

  stop() {
    for (const activePad of this.activePads) {
      activePad.audio.pause();
    }
    this.activePads = [];
    this.isPlaying = false;
    this.sub.unsubscribe();
  }

  private getActivePads(): Pad[] {
    let padsArr: Pad[] = [];
    this.pads.forEach((pad) => {
      if (pad.state) {
        padsArr.push(pad);
      }
    });
    this.activePads = [];
    return padsArr;
  }
}
