import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/types';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  author$ = this.service.author$;
  sort = new FormControl(null);
  unsubscribe$ = new Subject(); //  class level solution to handle observables unsubscription
  showDialog = false;
  editMode = false;
  editIndex: number | null = null;
  bookFormGroup: FormGroup; //add edit form
  showFormErrors = false;
  constructor(private service: CommonService, private fb: FormBuilder) {
    this.bookFormGroup = this.createBookForm();
  }

  ngOnInit(): void {
    this.service.getAuthors();

    this.initSortingFunctionality();
  }

  // this method will subscribe to the valuechanges of the sort form control
  initSortingFunctionality() {
    this.sort.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        if (val === 'title') {
          this.service.sortBooksByTitle();
        }
        if (val === 'year') {
          this.service.sortBooksByYear();
        }
      });
  }
  handleOpenDialog() {
    this.showDialog = true;
  }

  handleDialogClose() {
    this.showDialog = false;
    this.bookFormGroup.reset();
    this.showFormErrors = false;
    this.editMode = false;
  }

  handleAddEdit(action: 'add' | 'edit') {
    if (!this.bookFormGroup.valid) {
      this.showFormErrors = true;
      return;
    }
    this.showFormErrors = false;
    action === 'add'
      ? this.service.addBook(this.bookFormGroup.value)
      : this.service.editBook(this.editIndex!, this.bookFormGroup.value);
    this.handleDialogClose();
  }

  handleDelete(index: number) {
    this.service.deleteBook(index);
  }

  handleEditDialog(index: number, { title, PublishDate }: Book) {
    this.editMode = true;
    this.editIndex = index;
    this.bookFormGroup.patchValue({ title, PublishDate });
    this.handleOpenDialog();
  }

  createBookForm() {
    return this.fb.group({
      title: ['', Validators.required],
      PublishDate: [null],
      imageUrl: [''],
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
