import {Component, OnInit} from '@angular/core';
import {UserModel} from "../components/userModel";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit{
  users!: UserModel[]

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(){
    this.http.get<UserModel[]>('http://localhost:8080/admin/allUsers')
      .subscribe(resp => {
        console.log(resp)
        this.users = resp
      })
  }

  blockUser(id: number){
    this.http.delete<any>('http://localhost:8080/admin/blockUser/'+id)
      .subscribe(resp => {
        console.log(resp)
        this.loadUsers()
      })
  }

  convertDate(time: string){
    return new Date(time).toLocaleString()
  }
}
