import { autoinject, bindable, observable, customElement, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IPerson } from '../interfaces/iperson';
import { RouterConfiguration, Router } from 'aurelia-router';



//@inject(Element)

@autoinject
export class PeopleList {
    //public selectedDocument Document[];
    //@observable selectedDocument;
    
    constructor(private http: HttpClient) {
        
        //trying to solve task 6 here also, selecting the elements
        //still having problems
        //onload = function () {
        //    var tester = document.querySelector("#tester");
        //    console.log(tester);
           
        //}

    }


  heading = 'People';
  @bindable people: Person[] = [];

  async activate() {
    const response = await this.http.fetch('/people');
    const people = await response.json();
      this.people = people.map((person: IPerson) => new Person(person));
      //var tester = document.getElementById('#mainTable');
      //console.log(tester);

      
    }

    attached() {
        //var tester = document.getElementById('mainTable').style.color = "blue";
        //not efficient but working
        var AllTdElements = document.getElementsByTagName('td');
        for (var i = 0; i < AllTdElements.length; i++) {
            var TextContentOfTdElement = AllTdElements[i].textContent;
            if (TextContentOfTdElement === "Yes") {
                AllTdElements[i].style.color = "green";
            }
            if (TextContentOfTdElement === "No") {
                AllTdElements[i].style.color = "red";
            }
            
        }
    }

}
