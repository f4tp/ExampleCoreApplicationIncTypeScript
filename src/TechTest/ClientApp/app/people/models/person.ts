import { computedFrom } from 'aurelia-framework';
import { IPerson } from '../interfaces/iperson';
import { IColour } from '../interfaces/icolour';

export class Person implements IPerson {

  constructor(person: IPerson) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.authorised = person.authorised;
    this.enabled = person.enabled;
    this.colours = person.colours;
  }

  id: number;
  firstName: string;
  lastName: string;
  authorised: boolean;
  enabled: boolean;
  colours: IColour[];

  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @computedFrom('fullName')
  get palindrome(): boolean {

    // TODO: Step 5
    //
    // Implement the palindrome computed field.
    // True should be returned When the FullName is spelt the same
    // forwards as it is backwards. The match should ignore any
    // spaces and should also be case insensitive.
    //
    // Example: 'Bo Bob' is a palindrome.
      var isPalindrome = true;
      //convert to lower case and strip whitespace
      var formattedFullName = `${this.firstName}`.toLowerCase().replace(/\s/g, "");
      //loop terminates half way through, if it gets to the middle point then it is a palindrome
      //loop terminates when char found not to match
      var i = 0;
      do {
          //iterate forwards through the string and check each character against the last one, regressing each time
          if (!(formattedFullName.charAt(i) === formattedFullName.charAt(formattedFullName.length - 1 - i))) {
              isPalindrome = false;
          }
          i++;
      } while (i < formattedFullName.length / 2 && isPalindrome == true); 

      return isPalindrome;
  }
}
