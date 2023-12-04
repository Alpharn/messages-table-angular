import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MessageState } from "src/app/store/messages/reducers/message.reducer";

export const messageFeatureKey = 'messages';

/** Selector to get the entire question state */
export const selectMessageState = createFeatureSelector<MessageState>(messageFeatureKey);

/** Selector to retrieve all messages. */
export const selectMessages = createSelector(
  selectMessageState,
  (state: MessageState) => state.messages
);

/** Selector to determine if messages are currently being loaded. */
export const selectMessageLoading = createSelector(
  selectMessageState,
  (state: MessageState) => state.loading
);

/**
 * Selector to retrieve any errors related to message operations.
 * Returns an error object if there is an error in message operations; otherwise, null.
 */
export const selectMessageError = createSelector(
  selectMessageState,
  (state: MessageState) => state.error
);