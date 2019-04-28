import { autoinject } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router'
import { HttpClient, json } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IColour } from '../interfaces/icolour';
import { IPerson } from '../interfaces/iperson';
//imported redirect for after successful post
import { Redirect } from 'aurelia-router';

@autoinject
export class PersonEdit {

  constructor(private http: HttpClient, private router: Router) { }

  private heading: string;
  private person: Person;
  private colourOptions: IColour[] = [];
  private routerConfig: RouteConfig;

  async activate(params, routerConfig: RouteConfig) {
    this.routerConfig = routerConfig;

    const personResponse = await this.http.fetch(`/people/${params.id}`);
    this.personFetched(await personResponse.json());

    const colourResponse = await this.http.fetch('/colours');
    this.colourOptions = await colourResponse.json() as IColour[];
  }

  personFetched(person: IPerson): void {
    this.person = new Person(person)
    this.heading = `Update ${this.person.fullName}`;
    this.routerConfig.navModel.setTitle(`Update ${this.person.fullName}`);
  }

  colourMatcher(favouriteColour: IColour, checkBoxColour: IColour) {
    return favouriteColour.id === checkBoxColour.id;
  }

    async submit() {

        // TODO: Step 7
        //
        // Implement the submit and save logic.
        // Send a JSON request to the API with the newly updated
        // this.person object. If the response is successful then
        // the user should be navigated to the list page.

        
        //I couldn't complete this without learning Aurelia TypeScript fully (I would have to take a tutorial on it), but this is a couple of methods I tried to use:


        //method 2 (derived from other code I have seen written in this project / research)

        //let coloursArray = json(`${this.colourOptions}`);
        let coloursArray = this.colourOptions;

         let updatedPerson = {
            
             authorised: `${this.person.authorised}`,
             enabled: `${this.person.enabled}`
            // colours: `${this.person.colours.}`,
             //colours: json(this.colourOptions)

        }


        var idNeeded = `${this.person.id}`.toString();
        var dataNeeded = `${this.person}`;
        var putReq = this.http.fetch('/people/' + idNeeded, {
            method: 'put',
            //body: json(`${this.person}`)
            body: json(updatedPerson)
        })
            .then(response => response.json(
            ))
            .then(savedComment => {
                //new Redirect('http://localhost:64058/people');
                //alert(`Saved comment! ID: ${savedComment.id}`);
                this.router.navigate('http://localhost:64058/people');
            })
            .catch(error => {
                alert('Error updating person!');
            });


            //.then(data => {
            //    console.log(data);
            //});
   

      //method 1 (derived from own research)
      //HttpClient.call('http://localhost:64058/api/people/' + `${this.person.id}`, {
      //HttpClient.call('http://localhost:64058/api/people/' + `${this.person.id}`, {
      //    method: 'put',
      //    body: `${this.person}`
      //})
      //    .success(function () {
      //        //redirect here - as async call
      //        new Redirect('/people');
      //    })
      //    .fail(function () {

      //    })
      //    .always(function () {

      //    });

  



 
      //$.post('http://localhost:64058/api/person', `${this.person}`, function (personResponse) {

      //      return personResponse;
      //});

    //throw new Error('Not Implemented');
    }

  cancel() {
    this.router.navigate('people');
  }


};

