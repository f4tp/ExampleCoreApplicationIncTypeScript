import { autoinject, bindable, observable, customElement, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IPerson } from '../interfaces/iperson';
import { RouterConfiguration, Router } from 'aurelia-router';



@autoinject
export class PeopleList {
    
    constructor(private http: HttpClient) {}


  heading = 'People';
  @bindable people: Person[] = [];

  async activate() {
    const response = await this.http.fetch('/people');
    const people = await response.json();
      this.people = people.map((person: IPerson) => new Person(person));


      
    }

    attached() {
        //task 6 response here - not efficient but working
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
