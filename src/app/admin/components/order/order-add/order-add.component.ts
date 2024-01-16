import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../../../models/order';
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

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss',
})
export class OrderAddComponent {
  orders: Order[] = [];
  createForm!: FormGroup;
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private orderService: OrderService
  ) {}
  getCategoryList() {
    this.orderService.getAll().subscribe((result) => {
      this.orders = result.data;
    });
  }
  createCreateForm() {
    this.getCategoryList();
    this.createForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      Email: ['', Validators.required],
      cargoBranch: ['', Validators.required],
      sendDate: ['', Validators.required],
      sendCode: ['', Validators.required],
    });
  }
  onSubmit() {
    if (!this.createForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let order: Order = Object.assign({}, this.createForm.value);
    this.orderService.create(order).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.create-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
