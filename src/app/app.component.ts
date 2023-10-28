import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from './shared/services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'admin-ui';
  data: any;
  searchData: any;
  isVisible = false;
  adminForm!:FormGroup;
  rowId: any;

  constructor(private adminService: AdminService,private fb:FormBuilder) {}
  ngOnInit(): void {
    this.getUsersList();
  }

  buildForm(data:any){
    this.adminForm=this.fb.group({
      name:[data.name],
      email:[data.email],
      role:[data.role]
    })
  }
  public getUsersList() {
    this.adminService.getUsersList().subscribe((res: any) => {
      this.searchData = res
      this.data = res;
    });
    this.searchData = this.data.slice(0,10)
  }
  search(event: any) {
    this.searchData = this.data.filter((res: any) =>
      [res.name, res.role, res.email].some((value: string) =>
        value.includes(event)
      )
    )
  }

  deleteRow(event:any){
    this.searchData =  this.data.filter((res:any)=>{
      return res.id !== event.id;
    })
    this.data = this.searchData;
  }

  handleOk(): void {
    this.isVisible = false;
    this.searchData=this.data.map((res:any)=>{
      if(res.id==this.rowId){
        return{
          ...res,
          ...this.adminForm.value
        }
      }
      return res
    })
    this.data=this.searchData
    this.searchData;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  editRow(event:any){
    this.rowId=event.id;
    this.buildForm(event);
    this.isVisible = true;
  }

  deleteSelectedData(event:any){
    this.data = event;
    this.searchData = event;
  }

  onPagination(event:any){
    this.searchData = this.data.slice((event-1)*10,((event-1)*10)+10);
  }

}
