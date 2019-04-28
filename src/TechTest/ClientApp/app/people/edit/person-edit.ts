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

        
        let selectedColours = this.person.colours;
        let updatedPerson = {
            
             authorised: `${this.person.authorised}`,
             enabled: `${this.person.enabled}`,
             colours: selectedColours

        }

        var idNeeded = `${this.person.id}`.toString();
        var putReq = this.http.fetch('/people/' + idNeeded, {
            method: 'put',
            body: json(updatedPerson)
        })
            .then(response => response.json(
            ))
            .then(savedComment => {
                this.router.navigate('/people');
            })
            .catch(error => {
                alert('Error updating person!');
            });

    }

  cancel() {
    this.router.navigate('people');
  }


};

