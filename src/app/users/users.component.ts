import { Component, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { Customer, Representative } from '../models/user.model';
import { UsersService } from '../service/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, ButtonModule, ReactiveFormsModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  customers!: Customer[];

  representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    selectedStatus: any;

    selectedStatus2: any;

    @ViewChild('dt2', { static: false }) dt2!: Table;
    
    constructor(private customerService: UsersService, private router: Router, public dialog: MatDialog) {}

    goToModify(id: number) {
      this.router.navigate(['/users/modify', id]);
    }

    openDeleteDialog(userId: number): void {
      const dialogRef = this.dialog.open(DeleteUserComponent, {
        data: { userId } // Pass the userId to the dialog
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
        if (result) {
          
          
          this.deleteUserById(userId);
        }
      });
    }

    deleteUserById(userId: number) {
      this.customerService.deleteUserById(userId).subscribe(
        () => {
          console.log(`User with ID ${userId} deleted successfully`);
          this.customers = this.customers.filter(user => user.id !== userId);
          // Add logic to update the UI or navigate to another page
        },
        error => {
          console.error(`Failed to delete user with ID ${userId}`, error);
        }
      );
    }

    goToAddUser(){
      this.router.navigate(['/users/add']);
    }

    ngOnInit() {
      this.customerService.getCustomersLarge().subscribe(
        (data: Customer[]) => {
          this.customers = data;
        },
        (error) => {
          console.error('Failed to fetch customers', error);
        }
      );

    }



    onInput(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input) {
        this.dt2.filterGlobal(input.value, 'contains');
      }
    }

    clear(table: Table) {
        table.clear();
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return 'secondary';
            default: 
              return undefined;
        }
    }

}
