import { Component, ViewEncapsulation, OnInit, ViewChild, AfterContentInit} from '@angular/core';
import {DateRange,  MatCalendar,  MatCalendarCellClassFunction,MatCalendarUserEvent,MatCalendarView,MatMonthView, MatYearView } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Transaction } from 'src/app/models/transaction';
import { TransactionRepository } from 'src/app/repository/transaction.repository';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit{ 

  transactions?: Transaction[] | null;
  transactionsList?: Transaction[] | null;
  selected: Date = new Date();  
  currentDate: Date | null;
  day: Date = new Date();   
  dayList: Date[] = [];  
  selectedRange: DateRange<Date> | null = new DateRange<Date>(new Date(), new Date());
  

  currentView: MatCalendarView;  
  
  constructor(private transactionRepo: TransactionRepository) {console.log(this.currentDate)}

  ngOnInit(){
    this.transactionRepo.getTransactions().subscribe((t) => {
      this.transactions = t;      
      this.onMonthInitial();
      });   
              
   }   

   getTransactionsByMonth(date:Date){
    console.log(date)
    if(date){    
    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();    
    this.transactionsList = this.transactions?.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      console.log
      return (
        transactionDate.getMonth() === selectedMonth &&
        transactionDate.getFullYear() === selectedYear
      );})    
    }  
   }

  dateClassT(): MatCalendarCellClassFunction<Date> {    
    return (cellDate: Date, view: string) => {      
      if (view === 'month') {
        const cellDay = cellDate.getDate();
        const cellMonth = cellDate.getMonth();
        const cellYear = cellDate.getFullYear();       
        
        if (this.transactions) {
          const isReceived = this.transactions.some((item) => {
            const date = new Date(item.date);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
    
            return day === cellDay && month === cellMonth && year === cellYear && item.status === 'Received';
          });
  
          const isPayment = this.transactions.some((item) => {
            const date = new Date(item.date);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
    
            return day === cellDay && month === cellMonth && year === cellYear && item.status === 'Payment';
          });
  
          if (isReceived) {
            return 'highlight-date-received';
          } else if (isPayment) {
            return 'highlight-date-payment';
          }
        }
      }
      return '';
    };
    
  } 

  onMonthSelected(month: Date) {    
    // Update the currentMonth whenever the displayed month changes
    this.currentDate = month;
    console.log(this.transactionsList)
    this.getTransactionsByMonth(this.currentDate);
    console.log(`Displayed Month: ${this.currentDate}`);    
    console.log(this.transactionsList)
    if(this.transactionsList){
      this.transactionRepo.setSelectedDate(this.transactionsList!)
    }}

  onMonthInitial(){
    console.log(this.selected);
    this.getTransactionsByMonth(this.selected);
    console.log(this.transactionsList)
    if(this.transactionsList){
      this.transactionRepo.setSelectedDate(this.transactionsList!)
    }
  }

  onDaySelected(eventDay: Date | null) {    
    // Update the currentMonth whenever the displayed month changes
    const day = eventDay;
    console.log(day)
    if(day){    
      const selectedDay = day.getDay();
      console.log(selectedDay)
      const selectedMonth = day.getMonth();
      console.log(selectedMonth)
      const selectedYear = day.getFullYear(); 
      console.log(selectedYear)   
      this.transactionsList = this.transactions?.filter((transaction) => {
        const transactionDate = new Date(transaction.date);        
        return (
          transactionDate.getDay() === selectedDay &&
          transactionDate.getMonth() === selectedMonth &&
          transactionDate.getFullYear() === selectedYear
        );})    
      }  
    console.log(this.transactionsList)    
    if(this.transactionsList){
      this.transactionRepo.setSelectedDate(this.transactionsList!)
    }}
    
    
  

}