import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { UpdateUserDialog } from '../update-user-dialog/update-user-dialog.component';

export interface UserDetails {
  Visibility?: boolean;
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  edit?: string;
}

export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  edit?: string;
}


export enum Role {
  Admin = "admin",
  User = "user"
}

/** Constants used to fill up our data base. */

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['email', 'password', 'firstName', 'lastName', 'role', 'edit', 'delete'];
  dataSource!: MatTableDataSource<UserDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userList!: UserDetails[];

  constructor(
    private authService: AuthServiceService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    try {
      await this.authService.getUsers()
        .subscribe(async data => {
          this.userList = data;
          this.dataSource = new MatTableDataSource(this.userList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    } catch (error) {
      console.log(error);
    }
  }

  ngAfterViewInit() {
  }

  async deleteUser(email: string) {
    await this.authService.getUsers()
      .subscribe(async data => {
        let user = data[data.findIndex(a => a.email === email)];
        if (user) {
          let id = user.id;
          this.authService.deleteUser(id).subscribe((ret) => {
            this.getUsers();
          });
        }
      });
  }

  updateUser(id: number) {
    this.openDialog(id);

  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(UpdateUserDialog,{
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
      console.log(`Dialog result: ${result}`);
    });
  }

}