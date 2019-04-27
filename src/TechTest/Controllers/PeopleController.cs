using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using TechTest.Repositories;
using TechTest.Repositories.Models;

namespace TechTest.Controllers
{
    [Route("api/people")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        public PeopleController(IPersonRepository personRepository)
        {
            this.PersonRepository = personRepository;
        }

        private IPersonRepository PersonRepository { get; }

        [HttpGet]
        public IActionResult GetAll()
        {
            // TODO: Step 1
            //
            // Implement a JSON endpoint that returns the full list
            // of people from the PeopleRepository. If there are zero
            // people returned from PeopleRepository then an empty
            // JSON array should be returned.
            var CollectionOfPeople = PersonRepository.GetAll();
            if (CollectionOfPeople == null)
            {
                string[] nullArray = new string[] { };
                return Ok(nullArray);

            }
            //If I could find the relative place (to AppStart > WebApiConfig), I would have added  the Json / camel case serializer settings in there so that this was not needed each time //

            //Camel case the output - not needed, this is done elsewhere in the program (after testing)
            //var collectionOfPeopleJson = JsonConvert.SerializeObject(
            //    CollectionOfPeople,
            //    new JsonSerializerSettings
            //    {
            //        ContractResolver = new CamelCasePropertyNamesContractResolver()
            //    }
            //);
            return Ok(CollectionOfPeople);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // TODO: Step 2
            //
            // Implement a JSON endpoint that returns a single person
            // from the PeopleRepository based on the id parameter.
            // If null is returned from the PeopleRepository with
            // the supplied id then a NotFound should be returned.

            var SinglePersonInst = PersonRepository.Get(id);

            if (SinglePersonInst == null)
            {
                string[] nullArray = new string[] { };
                return Ok(nullArray);

            }

            //Camel case the output  not needed, this is done elsewhere in the program (after testing)
            //var SinglePersonJson = JsonConvert.SerializeObject(
            //    SinglePersonInst,
            //    new JsonSerializerSettings
            //    {
            //        ContractResolver = new CamelCasePropertyNamesContractResolver()
            //    }
            //);
            return Ok(SinglePersonInst);

            throw new NotImplementedException();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PersonUpdate personUpdate)
        {



            // TODO: Step 3
            //
            // Implement an endpoint that receives a JSON object to
            // update a person using the PeopleRepository based on
            // the id parameter. Once the person has been successfully
            // updated, the person should be returned from the endpoint.
            // If null is returned from the PeopleRepository then a
            // NotFound should be returned.


            //Below not needed as only a partial is passed in representing only elements that should be able to be updated
            //if (!ModelState.IsValid)
            //return NotFound();

            //get existing person
            var  ExistingPerson = PersonRepository.Get(id);
            Person UpdatedPerson;
            if (ExistingPerson == null)
                return NotFound();

            //update with limited properties
            ExistingPerson.Authorised = personUpdate.Authorised;
            ExistingPerson.Enabled = personUpdate.Enabled;

            //have to deserialize JSON colours properties here
            ExistingPerson.Colours = personUpdate.Colours;
            UpdatedPerson = PersonRepository.Update(ExistingPerson);
            
           
            // EntityState.Modified not needed as no db context

            //return correct HttpActionResult
            return Ok(UpdatedPerson);

            

            //tested using Postman
            //constructed JSON object to pass in is e.g.
            //{
            // "authorised" : true,
            // "enabled" : true,
            // "Colours" : [
            //  {
            //   "id":1,
            //   "name":"Red"

            //        },
            //  {
            //   "id":2,"name":"Green"
            //  },
            //  {
            //   "id":3,"name":"Blue"
            //  }

            // ]

            //}


            //One other thing I would have done is bring in Automapper and used DTOs with the objects in the API controller
        }
    }
}