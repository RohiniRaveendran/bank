import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // uname=""
  // acno=""
  // pswd=""

  //form group
  registerForm=this.formBuilder.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router) { }

  ngOnInit(): void {
  }
  register(){
    var acno=this.registerForm.value.acno
    var uname=this.registerForm.value.uname
    var pswd=this.registerForm.value.pswd

    if(this.registerForm.valid){
    
      //asynchronous Register API

    this.dataService.register(uname,acno,pswd)
    .subscribe(
      //status:200
      (result:any)=>{
    alert(result.message)
    this.router.navigateByUrl('')
    },
    //status:400
    result=>{
    alert(result.error.message)
    }
    )
    }
    else{
      alert('Invalid form!!!')
    }
  }
}


