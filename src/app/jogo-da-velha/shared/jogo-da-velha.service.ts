import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogoDaVelhaService {

  private readonly SIZE_TAB: number = 3;
  private readonly EXIS: number = 1;
  private readonly BALL: number = 2;
  private readonly EMPITY: number = 0;

  private board: any;
  private numMoviments: number;
  private win: any;

  private _player: number;
  private _showBegin: boolean;
  private _showBoard: boolean;
  private _showEnd: boolean;

  constructor() { }

  initialize(): void {
    this._showBegin = true;
    this._showBoard = false;
    this._showEnd = false;
    this.numMoviments = 0;
    this._player = this.EXIS;
    this.win = false; this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = [this.SIZE_TAB];
    for (let i = 0; i < this.SIZE_TAB; i++) {
      this.board[i] = [this.EMPITY, this.EMPITY, this.EMPITY];
    }
  }

  get showBegin(): boolean {
    return this._showBegin;
  }
  get showBoard(): boolean {
    return this._showBoard;
  }
  get showEnd(): boolean {
    return this._showEnd;
  }
  get player(): number {
    return this._player;
  }

  gameStart(): void {
    this._showBegin = false;
    this._showBoard = true;
  }

  play(posX: number, posY: number): void {
    if (this.board[posX][posY] !== this.EMPITY || this.win) {
      return;
    }

    this.board[posX][posY] = this._player;
    this.numMoviments++;
    this.win = this.endGame(posX, posY, this.board, this._player);
    this._player = (this._player === this.EXIS) ? this.BALL : this.EXIS;

    if (!this.win && this.numMoviments < 9) {
      this.playCpu();
    }

    if (this.win !== false) {
      this._showEnd;
    }

    if (!this.win && this.numMoviments === 9) {
      this._player = 0;
      this._showEnd = true;
    }
  }

  endGame(line: number, column: number, board: any, player: number) {
    let end: any = false;

    if (board[line][0] === player &&
      board[line][1] === player &&
      board[line][2] === player) {
      end = [[line, 0], [line, 1], [line, 2]];
    }
    if (board[column][0] === player &&
      board[column][1] === player &&
      board[column][2] === player) {
      end = [[column, 0], [column, 1], [column, 2]];
    }
    if (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) {
      end = [[0, 0], [1, 1], [2, 2]];
    }
    if (board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player) {
      end = [[0, 2], [1, 1], [2, 0]];
    }
    return end;
  }

  playCpu(): void{
    let play: number[] = this.getPlay(this.BALL);

    if (play.length <= 0){
      play = this.getPlay(this.EXIS);
    }

    if (play.length <= 0) {
      let plays: any = [];
      for (let i = 0; i < this.SIZE_TAB; i++){
        for (let j=0; j < this.SIZE_TAB; j++){
          if (this.board [i][j] === this.EMPITY){
            plays.push ([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (plays.length - 1)));
      play = [plays[k][0], plays[k][1]];
    }

    this.board [play[0]] [play[1]] = this._player;
    this.numMoviments++;
    this.win = this.endGame(play[0], play[1], this.board, this._player);
    this._player = (this._player === this.EXIS) ? this.BALL : this.EXIS;
  }

  getPlay(player: number) : number[] {
    let tab = this.board;
    for (let line = 0; line < this.SIZE_TAB; line++){
      for (let col = 0; col < this.SIZE_TAB; col++){
        if (tab[line][col] !== this.EMPITY){
          continue;
        }
        tab[line][col] = player;
        if (this.endGame(line, col, tab, player)){
          return [line, col];
        }
        tab[line][col] = this.EMPITY;
      }
    }
    return [];
  }



  showExis(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.EXIS;
  }

  showBall(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.BALL;
  }

  showWin(posX: number, posY: number): boolean {
    let showWin: boolean = false;

    if(!this.win) {
      return showWin;
    }

    for (let pos of this.win) {
      if (pos[0] === posX && pos[1] === posY) {
        showWin = true;
        break;
      }
    }
    return showWin;
  }

  newGame():void {
    this.initialize();
    this._showEnd = false;
    this._showBegin = false;
    this._showBoard = true;
  }
}
