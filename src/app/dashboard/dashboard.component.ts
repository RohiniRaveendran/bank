import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  amount=""
  pswd=""
  //acno=""
  //form group
  depositForm=this.formBuilder.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  //form group
  withdrawForm=this.formBuilder.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })
  
  //current user
  user:any;

  //to hold the account to delete
  acno:any;

  constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router) { }

  ngOnInit(): void {
    this.user=this.dataService.currentUser
    if(!localStorage.getItem('currentAcno')){
      alert('Please Log in')
      this.router.navigateByUrl('')
    }
  }

  deposit(){
    var acno=this.depositForm.value.acno
    var amount=this.depositForm.value.amount
    var pswd=this.depositForm.value.pswd

    if(this.depositForm.valid){
      this.dataService.deposit(acno,pswd,amount)
      .subscribe((result:any)=>{
        alert(result.message)
      },
      result=>{
        alert(result.error.message)
      }
      )

    }
    else{
      alert('Invalid form')
    }
  }

  
  withdraw(){
    var acno =this.withdrawForm.value.acno
    var pswd =this.withdrawForm.value.pswd
    var amnt=this.withdrawForm.value.amount
    if(this.withdrawForm.valid){
      const result =this.dataService.withdraw(acno,pswd,amnt)
if(result){
  alert(`${amnt} withdraw successfully and new balance is ${result}`)
}
    }
    else{
      alert('Invalid Form')
    }

  }
  logout(){
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    this.router.navigateByUrl('')
  }
  deleteAcc(){
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }
  cancel(){
    this.acno=''
  }
  delete(event:any){
    alert('from parent dashboard ' +event)
  }
}
