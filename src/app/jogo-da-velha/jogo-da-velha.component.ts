import { Component, OnInit } from '@angular/core';
import { JogoDaVelhaService } from './shared';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css']
})
export class JogoDaVelhaComponent implements OnInit {

  constructor(private jogoDaVelhaService: JogoDaVelhaService) { }

  ngOnInit(): void {
    this.jogoDaVelhaService.initialize();
  }

  get showBegin(): boolean {
    return this.jogoDaVelhaService.showBegin;
  }

  get showBoard(): boolean {
    return this.jogoDaVelhaService.showBoard;
  }
  get showEnd(): boolean {
    return this.jogoDaVelhaService.showEnd;
  }
  gameStart(): void {
    this.jogoDaVelhaService.gameStart();
  }

  play(posX: number, posY: number) : void {
    this.jogoDaVelhaService.play(posX, posY);
  }
  showExis(posX: number, posY: number) : boolean {
    return this.jogoDaVelhaService.showExis(posX, posY);
  }
  showBall(posX: number, posY: number) : boolean {
    return this.jogoDaVelhaService.showBall(posX, posY);
  }
  showWin(posX: number, posY: number) : boolean {
    return this.jogoDaVelhaService.showWin(posX, posY);
  }
  get player() : number {
    return this.jogoDaVelhaService.player;
  }
  newGame() : void {
    this.jogoDaVelhaService.newGame();
  }
}
