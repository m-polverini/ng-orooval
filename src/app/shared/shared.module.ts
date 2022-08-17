import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/toast/toast.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [FormsModule, ReactiveFormsModule, NgbModule, ToastComponent],
  providers: [CookieService],
})
export class SharedModule {}
