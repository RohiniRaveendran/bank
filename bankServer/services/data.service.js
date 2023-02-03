//jsonwebtoken import
const jwt = require('jsonwebtoken')
//import db.js
const db = require('./db')



 //database
 database={
    1000:{acno:1000,username:'neer',password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,username:'neera',password:1001,balance:6000,transaction:[]},
    1002:{acno:1002,username:'neeraj',password:1002,balance:7000,transaction:[]}
}



//register
const register=(username,acno,password)=>{
  //asynchronous
 return db.User.findOne({
    acno
 }).then(result=>{
  if(result){
    return {
      statusCode:404,
      status:false,
      message:'user already exists!!!please log in'
    }
  }
  else{
    const newUser = new db.User({
      acno,
    username,
    password,
    balance:0,
    transaction:[]
    })
    newUser.save()
    return {
      statusCode:200,
      status:true,
      message:'Register Successfully'
    }
  }
 })
 }
  //login
  const login=(acno,pswd)=>{
    // search acno,pswd in mongodb
    return db.User.findOne({
      acno,
      password:pswd
    }).then(result=>{
      if(result){
        currentUser=result.username
        currentAcno=acno
        //token generation-sign()
        const token = jwt.sign({
            currentAcno:acno 
        },'supersecretKey12345')
        return {
            statusCode:200,
            status:true,
            message:'Login Successfully',
            currentUser,
            currentAcno,
            token

          }

      }
      else{
        return {
          statusCode:404,
          status:false,
          message:'Incorrect account number / password'
        }
      }
    })    
  }

  //deposit

  const deposit=(acno,pswd,amt)=>{
    const amount=parseInt(amt)
    return db.User.findOne({
      acno,
      password:pswd
    }).then(result=>{
      if(result){
        result.balance+=amount
        result.transaction.push({
          type:'CREDIT',
          amount
        })
        result.save()
        return{
            statusCode:200,
            status:true,
            message:`${amount} deposited successfully and new balance is ${result.balance}`

        }
      }
      else{
        return {
          statusCode:404,
          status:false,
          message:'Incorrect account number / password'
        }
      }
    })
    
  }

  //withdraw
 const withdraw=(acno,pswd,amt)=>{
     const amount=parseInt(amt)
     return db.User.findOne({
      acno,
      password:pswd
    }).then(result=>{
      if(result){
        if(result.balance>amount){
          result.balance-=amount
          result.transaction.push({
            type:'DEBIT',
            amount
          })
          result.save()
        return{
            statusCode:200,
            status:true,
            message:`${amount} debitted successfully and new balance is ${result.balance}`

        }
      }
      else{
        return  {
          statusCode:404,
          status:false,
          message:'insufficient balance'
        }
      }
    }
    else{
      return {
        statusCode:404,
        status:false,
        message:'Incorrect account number / password'
        }
      }
    })
  }

  //transaction
  const getTransaction = (acno)=>{
    return db.User.findOne({
      acno
    }).then(result=>{
      if(result){
        return {
          statusCode:200,
          status:true,
          transaction:result.transaction
        }
      }
      else{
        return {
           statusCode:404,
           status:false,
           message:'user doesnot exist'
         }
      }
    })
}
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction

  }