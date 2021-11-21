import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pad } from 'src/app/interfaces/pad.inteface';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.scss'],
})
export class PadComponent implements OnInit {
  @Input() pad!: Pad;
  @Output() changeStateEmitter: EventEmitter<Pad> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.pad.name);
  }

  togglePadState() {
    this.pad.state = !this.pad.state;
    this.changeStateEmitter.emit(this.pad);
  }
}
