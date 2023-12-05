import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, of, mergeMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as MessageActions from '../actions/message.actions';
import { MessageService } from 'src/app/services/message.service';
import { MessageState } from "src/app/store/messages/reducers/message.reducer";
import { loadMessages } from 'src/app/store/messages/actions/message.actions';

/**
 * This class contains the effects that handle the side effects of actions related to messages,
 * such as adding, loading, deleting messages.
 */
@Injectable()
export class MessageEffects {

  constructor(
    private actions$: Actions,
    private messageService: MessageService,
    private store: Store<MessageState>,
    private snackBar: MatSnackBar
  ) {}
  
  /** Effect to handle the addition of a new message */
  addMessage$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.addMessage),
    mergeMap(action => 
      this.messageService.addMessage(action.message).pipe(
        map(docRef => MessageActions.addMessageSuccess({ messageId: docRef.id })),
        catchError(error => of(MessageActions.addMessageFailure({ error }))),
        tap(() => this.store.dispatch(loadMessages()))
      )
    )
  ));
  
  /** Effect to handle the loading of messages */
  loadMessages$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.loadMessages),
    switchMap(() => this.messageService.getMessages().pipe(
      map(messages => MessageActions.loadMessagesSuccess({ messages })),
      catchError(error => of(MessageActions.loadMessagesFailure({ error })))
    ))
  ));

  /** Effect to handle the deletion of a message */
  deleteMessage$ = createEffect(() => this.actions$.pipe(
    ofType(MessageActions.deleteMessage),
    switchMap(action => this.messageService.deleteMessage(action.id).pipe(
      map(() => MessageActions.deleteMessageSuccess({ id: action.id })),
      catchError(error => of(MessageActions.deleteMessageFailure({ error })))
    ))
  ));

  /** Effect to show a success notification when a message is successfully added */
  showAddSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(MessageActions.addMessageSuccess),
      tap(() => {
        this.snackBar.open('Message added successfully!', 'Close', {
          duration: 3000
        });
      })
    ),
    { dispatch: false }
  );
  
  /** Effect to show a failure notification when adding a message fails */
  showAddFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(MessageActions.addMessageFailure),
      tap(() => {
        this.snackBar.open('Failed to add message!', 'Close', {
          duration: 3000
        });
      })
    ),
    { dispatch: false }
  );

}