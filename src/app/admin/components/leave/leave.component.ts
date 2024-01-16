import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveService } from '../../../services/leave.service';
import { Leave } from '../../../models/leave';
import { CommonModule } from '@angular/common';
import { LeaveUpdateComponent } from './leave-update/leave-update.component';
import { LeaveAddComponent } from './leave-add/leave-add.component';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, LeaveUpdateComponent, LeaveAddComponent, RouterLink],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss',
})
export class LeaveComponent implements OnInit {
  users!: User[];
  leaves: Leave[] = [];
  selectedLeave!: Leave;
  @ViewChild(LeaveAddComponent, { static: true })
  addLeaveComponent!: LeaveAddComponent;
  @ViewChild(LeaveUpdateComponent, { static: true })
  updateLeaveComponent!: LeaveUpdateComponent;
  constructor(
    private leaveService: LeaveService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.userService.getAll().subscribe((result) => {
      this.users = result.data;
    });
    this.leaveService.getAll().subscribe((result) => {
      this.leaves = result.data;
    });
  }

  showAddModal() {
    this.addLeaveComponent.getUserList();
    this.addLeaveComponent.createLeaveForm();
  }
  showEditModal(leave: Leave | null) {
    if (leave == null) return;
    this.updateLeaveComponent.createUpdateForm(leave);
  }
  deleteLeaveById(id: number) {
    this.leaveService.deleteById(id).subscribe((result) => {
      this.getList();
    });
  }
}
