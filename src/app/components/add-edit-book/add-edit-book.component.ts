import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditBookComponent {
  @Input() bookFormGroup!: FormGroup;
  @Input() showFormErrors = false;
  @Input() editMode = false;
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();

  handleClose() {
    this.close.emit();
  }
  handleAdd() {
    this.add.emit();
  }
  handleEdit() {
    this.edit.emit();
  }
}
