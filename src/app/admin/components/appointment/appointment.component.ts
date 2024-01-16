import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../models/appointment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentUpdateComponent,
    AppointmentAddComponent,
    RouterLink,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment!: Appointment;
  @ViewChild(AppointmentAddComponent, { static: true })
  addAppointmentComponent!: AppointmentAddComponent;
  @ViewChild(AppointmentUpdateComponent, { static: true })
  updateAppointmentComponent!: AppointmentUpdateComponent;
  constructor(private appointmentService: AppointmentService) {}
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.appointmentService.getAll().subscribe((result) => {
      this.appointments = result.data;
    });
  }
  isImage(url: string | null) {
    if (url == null || url == undefined) return false;
    if (url.split('.').length == 1) return false;
    let allowedTypes = ['.jpeg', '.jpg', '.png', '.gif'];
    return allowedTypes.find((type) => url.includes(type)) != undefined;
  }
  showAddModal() {
    this.addAppointmentComponent.createCreateForm();
  }
  showEditModal(appointment: Appointment | null) {
    if (appointment == null) return;
    this.updateAppointmentComponent.createUpdateForm(appointment);
  }
  deleteAppointmentById(id: number) {
    this.appointmentService.deleteById(id).subscribe((result) => {
      this.getList();
    });
  }
}
