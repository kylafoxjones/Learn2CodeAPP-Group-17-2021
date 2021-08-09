import { Component, OnInit } from '@angular/core';
import { ChartType,ChartOptions } from 'chart.js';
import Swal from 'sweetalert2'
import { Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet } from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as Chart from 'chart.js';
import { title } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  


  barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: '# of students at each university'
  },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Students'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'University Of'
        }
      }]
    }     
    
  };
  barChartLabels: Label[] = ['Pretoria', 'Johannesburg', 'Cape Town', 'Witwaterstrand', 'Limpopo'];
  barChartType: Chart.ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  

  barChartData: Chart.ChartDataSets[] = [
   
    { data: [95, 38, 50, 50, 45], label: 'Students' },
     
  ];


  public pieChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: '# of courses sold'
  },
  };
  public pieChartLabels: Label[] = [['Angular'], ['MVC'], ['CSS']];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor(private breakpointObserver: BreakpointObserver,) { monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend(); }

  ngOnInit(): void {
  }

  logout(){
    Swal.fire({
    
      icon: 'warning',
      title: 'Are you sure you want to logout',
      confirmButtonText: 'Confirm',
     
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel'
      
    })
  }

}
