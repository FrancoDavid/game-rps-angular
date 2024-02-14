import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GameRpsModalService } from '../../services/game-rps-modal.service';

@Component({
    selector: 'game-rps-modal',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
        <dialog #appDialog class="modal-game">
            <h2 class="modal-game--title">{{modal.title}}</h2>
            <p class="modal-game--description">{{modal.description}}</p>

            <button class="btn-inline--reverse" (click)="onClose()">Close</button>
        </dialog>
    `,
    styleUrl: './game-rps-modal.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRpsModalComponent {
    @ViewChild('appDialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;

    public modal: {
        title: string,
        description: string
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _gameModalService: GameRpsModalService) {
        this.modal = {
            title: '',
            description: ''
        };
    }
  
  ngOnInit(): void {

    this._gameModalService.getStateModal$()
        .subscribe((state) => {
            if (state.isOpen) {

                this.modal.description = state.description;
                this.modal.title = state.title;
                
                if (document.body.contains(this.dialog.nativeElement)) {
                    this.dialog.nativeElement.showModal();
                    this._changeDetectorRef.detectChanges();
                } 
            }
        });
  }
  
  ngOnDestroy(): void {
    this.dialog.nativeElement.close();
    this._changeDetectorRef.detectChanges();
  }

  public onClose(): void {
    this.dialog.nativeElement.close();
    this._changeDetectorRef.detectChanges();
  }

}
