import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  acno:any
  transactions:any
  //currentuser
  // user:any

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    //current user
    // this.user =this.dataService.currentUser
    //get the current acno
    this.acno=this.dataService.currentAcno
    this.transactions = this.dataService.getTransaction(this.acno)
console.log(this.transactions);

    
  }   

}