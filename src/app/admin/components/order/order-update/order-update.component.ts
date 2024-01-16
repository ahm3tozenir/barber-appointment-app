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
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../models/order';

@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.scss',
})
export class OrderUpdateComponent {
  orders: Order[] = [];
  updateForm!: FormGroup;
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private ordersService: OrderService
  ) {}

  getCategoryList() {
    this.ordersService.getAll().subscribe((result) => {
      this.orders = result.data;
    });
  }
  createUpdateForm(order: Order) {
    this.updateForm = this.formBuilder.group({
      id: [order.id, Validators.required],
      name: [order.fullName, Validators.required],
    });
  }
  onSubmit() {
    if (!this.updateForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let order: Order = Object.assign({}, this.updateForm.value);
    this.ordersService.update(order).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.edit-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
