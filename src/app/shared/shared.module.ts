import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [FormsModule, ReactiveFormsModule, NgbModule, ToastComponent],
})
export class SharedModule {}
