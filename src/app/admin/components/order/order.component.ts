import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrderAddComponent } from './order-add/order-add.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, OrderUpdateComponent, OrderAddComponent, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder!: Order;
  @ViewChild(OrderAddComponent, { static: true })
  addOrderComponent!: OrderAddComponent;
  @ViewChild(OrderUpdateComponent, { static: true })
  updateOrderComponent!: OrderUpdateComponent;
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.orderService.getAll().subscribe((result) => {
      this.orders = result.data;
    });
  }
  isImage(url: string | null) {
    if (url == null || url == undefined) return false;
    if (url.split('.').length == 1) return false;
    let allowedTypes = ['.jpeg', '.jpg', '.png', '.gif'];
    return allowedTypes.find((type) => url.includes(type)) != undefined;
  }
  showAddModal() {
    this.addOrderComponent.createCreateForm();
  }
  showEditModal(order: Order | null) {
    if (order == null) return;
    this.updateOrderComponent.createUpdateForm(order);
  }
  deleteAppointmentById(id: number) {
    this.orderService.deleteById(id).subscribe((result) => {
      this.getList();
    });
  }
}
