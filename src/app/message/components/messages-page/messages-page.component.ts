import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

import { PaginationService } from 'src/app/services/pagination.service';
import { MessageAddDialogComponent } from '../message-add-dialog/message-add-dialog.component';
import { MessageDeleteDialogComponent } from '../message-delete-dialog/message-delete-dialog.component';
import { IMessage } from "src/app/message/interfaces/message.interface";
import { MessageState } from "src/app/message/store/messages/reducers/message.reducer";
import { addMessage, loadMessages, deleteMessage } from 'src/app/message/store/messages/actions/message.actions';
import { selectMessages, selectMessageLoading } from 'src/app/message/store/messages/selectors/message.selectors';
import { DIALOG_WIDTH } from "src/app/message/constants/constants";

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent implements OnInit, OnDestroy {

  /** Columns displayed in the message table. */
  readonly displayedColumns: string[] = ['id', 'name', 'message', 'date', 'action'];

  /** ViewChild for sorting the table. */
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  /** ViewChild for pagination. */
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  /** DataSource for MatTable. */
  messages!: MatTableDataSource<IMessage>;

  /** Observable indicating if messages are being loaded. */
  isLoading$: Observable<boolean> = this.store.select(selectMessageLoading);

  /** Subject used to unsubscribe from observables in ngOnDestroy. */
  private destroy$: Subject<void> = new Subject<void>;

  constructor(
    private dialog: MatDialog,
    private store: Store<MessageState>,
    private paginationService: PaginationService
  ) {}

  /**
   * Dispatches action to load messages and sets up subscription to message updates.
   */
  ngOnInit(): void {
    this.store.dispatch(loadMessages());
    this.store.select(selectMessages)
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = new MatTableDataSource(messages);
        this.messages.sort = this.sort;
        this.messages.paginator = this.paginator;

        this.paginator.pageIndex = this.paginationService.getPageIndex();
        this.paginator.pageSize = this.paginationService.getPageSize();
      });
  }

  /** Opens a dialog for adding a new message. */
  openAddMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageAddDialogComponent, {
      width: DIALOG_WIDTH
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(addMessage({ message: result.data }));
      }
    });
  }

  /**
   * Opens a dialog for deleting a specific message.
   * 
   * @param message The message object to be deleted.
   */
  openDeleteMessageDialog(message: IMessage): void {
    const dialogRef = this.dialog.open(MessageDeleteDialogComponent, {
      width: DIALOG_WIDTH,
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteMessage({ id: result.data.id }));
      }
    });
  }

  /**
   * Updates pagination settings.
   * 
   * @param event The PageEvent from MatPaginator.
   */
  updateRoute(event: PageEvent): void {
    this.paginationService.setPageIndex(event.pageIndex);
    this.paginationService.setPageSize(event.pageSize);
  }

  /** Completes the destroy$ observable to unsubscribe from all subscriptions */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
