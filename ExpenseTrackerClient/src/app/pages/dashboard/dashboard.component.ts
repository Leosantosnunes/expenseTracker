import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';
import { Transaction } from 'src/app/models/transaction';
import { TransactionRepository } from 'src/app/repository/transaction.repository';




interface month {
  value: string;
  viewValue: string;
}

export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface spendingsChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface monthlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

// ecommerce card
interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit { 

  public salesOverviewChart!: Partial<salesOverviewChart> | any;
  public spendingsChart!: Partial<spendingsChart> | any;
  public monthlyChart!: Partial<monthlyChart> | any;

  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;

  months: month[] = [
    { value: 'sep', viewValue: 'September 2023' },
    { value: 'oct', viewValue: 'October 2023' },
    { value: 'nov', viewValue: 'November 2023' },
  ]; //updated months

  transactions?: Transaction[] | null;
  selected: Date | null;    
  day: Date = new Date();   
  dayList: Date[] = [];
  
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: Date, view: string) => {
    if (view === 'month') {
      const cellDay = cellDate.getDate();
      const cellMonth = cellDate.getMonth();
      const cellYear = cellDate.getFullYear();
      
      if (this.dayList.some((date) => {
        const day = new Date(date).getDate();
        const month = new Date(date).getMonth();
        const year = new Date(date).getFullYear();
  
        return day === cellDay && month === cellMonth && year === cellYear;
      })) {
        return 'highlight-date';
      }
    }
    return '';
  };
  
  constructor(private transactionRepo: TransactionRepository) {}

  async ngOnInit(): Promise<void> {
    this.transactionRepo.getTransactions().subscribe((t) => {
      this.transactions = t;      
      const series: number[] = [];
      const labels: (string | undefined)[] = [];
      this.transactions.forEach((item) => {                                  
        if (item.status != 'Payment') return;
        series.push(item.amount);
        labels.push(item.subcategory);              
      });
    });
  } 
  
  getMessage() {
    return 'More saving than last month';
  }

  getTotal() {
    let total = 0;
    this.transactions?.forEach((item) => {
      if (item.status != 'Payment') return;
      total += item.amount;      
    });
    return `$${total}`;
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
  
  
  

}
  

