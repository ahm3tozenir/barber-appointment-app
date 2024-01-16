import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Leave } from '../../../../models/leave';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../../../../services/leave.service';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-leave-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './leave-update.component.html',
  styleUrl: './leave-update.component.scss',
})
export class LeaveUpdateComponent {
  leaves!: Leave;
  users!: User[];
  updateForm!: FormGroup;
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private leaveService: LeaveService
  ) {}

  createUpdateForm(leave: Leave) {
    this.updateForm = this.formBuilder.group({
      id: [leave.id, Validators.required],
      userId: [leave.userId, Validators.required],
      startDate: [leave.startDate, Validators.required],
      endDate: [leave.endDate, Validators.required],
    });
  }
  onSubmit() {
    if (!this.updateForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let leave: Leave = Object.assign(this.updateForm.value);
    this.leaveService.update(leave).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.edit-leave-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
