import { autoinject, bindable, observable } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IPerson } from '../interfaces/iperson';
import { RouterConfiguration, Router } from 'aurelia-router';


@autoinject
export class PeopleList {
    //public selectedDocument Document[];
    @observable selectedDocument;

    constructor(private http: HttpClient) {
       
        //trying to solve task 6 here also, selecting the elements
        //still having problems
        onload = function () {
            var tester = document.querySelector("#tester");
            console.log(tester);
           
        }

    }


  heading = 'People';

  @bindable people: Person[] = [];

  async activate() {
    const response = await this.http.fetch('/people');
    const people = await response.json();
      
      this.people = people.map((person: IPerson) => new Person(person));
      
  }
}
