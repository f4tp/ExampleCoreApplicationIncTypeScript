import { IColour } from '../people/interfaces/icolour';

export class ColourNamesValueConverter {

  toView(colours: IColour[]) {

    // TODO: Step 4
    //
    // Implement the value converter function.
    // Using the colours parameter, convert the list into a comma
    // separated string of colour names. The names should be sorted
    // alphabetically and there should not be a trailing comma.
    //
    // Example: 'Blue, Green, Red'
      var stringifiedColours = "";
      
      if (colours !== null) {
        //efficient way of sorting using lambda expressions
          colours.sort((a, b) => (a.name > b.name) ? 1 : -1);

          //iterator pattern 
        colours.forEach(function (colour) {
            stringifiedColours += colour.name + ","
        });
        var strippcommStrippedString = stringifiedColours.substring(0, stringifiedColours.length - 1);


      }
      return strippcommStrippedString;
  }

}
