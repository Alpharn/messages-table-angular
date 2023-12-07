import { createAction, props } from '@ngrx/store';

import { IMessage } from 'src/app/message/interfaces/message.interface';

/** Add message actions */
export const addMessage = createAction(
  '[Message] Add Message',
  props<{ message: IMessage }>()
);

export const addMessageSuccess = createAction(
  '[Message] Add Message Success',
  props<{ messageId: string }>()
);

export const addMessageFailure = createAction(
  '[Message] Add Message Failure',
  props<{ error: any }>()
);

/** Load message actions */
export const loadMessages = createAction(
  '[Message] Load Messages'
);

export const loadMessagesSuccess = createAction(
  '[Message] Load Messages Success',
  props<{ messages: IMessage[] }>()
);

export const loadMessagesFailure = createAction(
  '[Message] Load Messages Failure',
  props<{ error: any }>()
);

/** Delete message actions */
export const deleteMessage = createAction(
  '[Message] Delete Message',
  props<{ id: string }>()
);

export const deleteMessageSuccess = createAction(
  '[Message] Delete Message Success',
  props<{ id: string }>()
);

export const deleteMessageFailure = createAction(
  '[Message] Delete Message Failure',
  props<{ error: any }>()
);