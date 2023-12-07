import { createReducer, on } from '@ngrx/store';

import * as MessageActions from '../actions/message.actions';
import { IMessage } from 'src/app/message/interfaces/message.interface';

/** MessageState - Interface representing the state structure for messages */
export interface MessageState {
  messages: IMessage[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
}

export const initialState: MessageState = {
  messages: [],
  loading: false,
  isSubmitting: false,
  error: null
};

/** This reducer updates the state based on different message actions */
export const messageReducer = createReducer(
  initialState,
  on(MessageActions.addMessage, state => ({
    ...state,
    loading: true,
    isSubmitting: true,
    error: null
  })),
  on(MessageActions.addMessageSuccess, (state) => ({
    ...state,
    isSubmitting: false,
    loading: false
  })),
  on(MessageActions.addMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    isSubmitting: false,
    error
  })),
  on(MessageActions.loadMessages, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MessageActions.loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    loading: false
  })),
  on(MessageActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(MessageActions.deleteMessage, state => ({
    ...state,
    loading: true
  })),
  on(MessageActions.deleteMessageSuccess, (state, { id }) => ({
    ...state,
    messages: state.messages.filter(message => message.id !== id),
    loading: false
  })),
  on(MessageActions.deleteMessageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);