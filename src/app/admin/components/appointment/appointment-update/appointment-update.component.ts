import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../../../../models/appointment';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../../../services/appointment.service';

@Component({
  selector: 'app-appointment-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-update.component.html',
  styleUrl: './appointment-update.component.scss',
})
export class AppointmentUpdateComponent {
  appointments: Appointment[] = [];
  updateForm!: FormGroup;
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private appointmentService: AppointmentService
  ) {}

  getCategoryList() {
    this.appointmentService.getAll().subscribe((result) => {
      this.appointments = result.data;
    });
  }
  createUpdateForm(appointment: Appointment) {
    this.updateForm = this.formBuilder.group({
      id: [appointment.id, Validators.required],
      name: [appointment.fullName, Validators.required],
    });
  }
  onSubmit() {
    if (!this.updateForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let appointment: Appointment = Object.assign({}, this.updateForm.value);
    this.appointmentService.update(appointment).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.edit-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
