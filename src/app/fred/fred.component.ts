import { Component, OnInit} from '@angular/core';
import { APIService } from '../Services/api.service';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { Observations, series } from 'src/assets/stockmodels';
import { EventemitService } from '../Services/eventemit.service';
import {ReactiveFormsModule,FormControl, FormsModule } from '@angular/forms';
PlotlyModule.plotlyjs = PlotlyJS;
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
    selector: 'fred',
    templateUrl: './fred.component.html',
    styleUrls: ['./fred.component.css'],
    imports: [
        PlotlyModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        CommonModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule
    ]
})
export class FredComponent implements OnInit{
  
  _series_ctrl:FormControl;
  _filteredSeries:Observable<series[]>;
  _allseries:series[];
  _selectedseries:series;

  ngOnInit(): void {
    this.getSeries();
   
  }
  constructor(private api:APIService, private _sharedevents:EventemitService){
    this._selectedseries = {title:'', units:'', seriesID:''};
    this._allseries = [];
    this._series_ctrl  = new FormControl(null,
      [    
      ]
    );
    
    //pipe to filter for autocomplete
    this._filteredSeries = this._series_ctrl?.valueChanges.pipe(
      startWith(null),
      map((entered:string | null) =>(entered? this.filterSeries(entered): []))
    );

    this._sharedevents.newFredSeries$.subscribe(
      (selectedSeries:series)=>{
        this.getObservations(selectedSeries);
      }
    );

  }

  private getSeries(){
    // this.api.getallseries().subscribe(
    //   (response:series[])=>{
    //     this._allseries = response;
    //     this._selectedseries = response[0];
    //     let id = this._selectedseries.seriesID;
    //     this._series_ctrl.setValue(this._selectedseries.seriesID);
    //     this._sharedevents._fredSeries.next(this._selectedseries);    
    //   }
    // );
  }

  private getObservations(selectedSeries:series){
    // this.api.getseriesobservations(selectedSeries.seriesID).subscribe(
    //   (response:Observations[])=>{
    //     this._sharedevents._fredData.next(response);
    //   }
    // );
  }

  onSelectSeriesID(event:MatAutocompleteSelectedEvent){
    //enable the chart here
    //set progress spinner
    const series:string = event.option.value;
    let newseries:series | undefined = this._allseries.find(e => e.seriesID == series);
    if (newseries == undefined){return;}
    else{ this._sharedevents._fredSeries.next(newseries);}

    // this.api.getseriesobservations(series).subscribe(
    //   (response:Observations[])=>{
    //     this._sharedevents._fredData.next(response);
    //   }
    // );
  }

  private filterSeries(entered:string){
    //filter for the seriesid
    return this._allseries.filter((e) =>(e.seriesID.startsWith(entered)) );
  }
}
