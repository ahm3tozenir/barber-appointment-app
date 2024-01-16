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
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-leave-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './leave-add.component.html',
  styleUrl: './leave-add.component.scss',
})
export class LeaveAddComponent {
  createForm!: FormGroup;
  users!: User[];
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private leaveService: LeaveService,
    private userService: UserService
  ) {}

  getUserList() {
    this.userService.getAll().subscribe((result) => {
      this.users = result.data;
    });
  }

  createLeaveForm() {
    this.createForm = this.formBuilder.group({
      userId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  onSubmit() {
    if (!this.createForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let leave: Leave = Object.assign({}, this.createForm.value);
    this.leaveService.create(leave).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.create-leave-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
