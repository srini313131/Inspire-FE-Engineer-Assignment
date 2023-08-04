import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Book } from 'src/app/types';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  @Input() book: Book | undefined;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  handleDelete() {
    this.delete.emit();
  }

  handleEdit() {
    this.edit.emit();
  }
}
