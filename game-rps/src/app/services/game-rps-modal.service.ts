import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameRpsModalService {

  private _showModalBehavior: BehaviorSubject<{isOpen: boolean, title: string, description: string}>;

  constructor() {
    this._showModalBehavior = new BehaviorSubject<{isOpen: boolean, title: string, description: string}>({isOpen: false, title: '', description: ''});
  }

  public getStateModal$(): Observable<{isOpen: boolean, title: string, description: string}> {
    return this._showModalBehavior.asObservable();
  }

  public openModalWin(): void {
    this._showModalBehavior.next({isOpen: true, title: 'You are Winner!', description: 'Congratulations, thanks to playing'});
  }

  public openModalLose(): void {
    this._showModalBehavior.next({isOpen: true, title: 'You are Loser!', description: 'The PC Won!, thanks to playing'});
  }


}
