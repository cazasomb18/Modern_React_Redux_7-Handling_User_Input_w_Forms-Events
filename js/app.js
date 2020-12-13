////////////////////////////////////////////////////////////////////////////////////////////////////
//Stuff to Figure Out
	//How do we get feedback from the user?
	//How do we fetch data from some outside API or server?
	//How do we show lists of records?

//APP PHASE I
	//We want to show a text input at the top-center of screen where user can enter text
	//After they enter term and press enter we will make a request to get images 
	//Then we will render those images on the screen after we've received the data

//APP PHASE II
	//How we show the images will be different:
		//Previously we were going to list them going straight down
		//Now we want to tile the images across the screens



////////////////////////////////////////////////////////////////////////////////////////////////////
//Component Design		

//APP CHALLENGES
	//Need to get a search term from the user
	//Need to use that search term to make a request to an outside api and fetch data
	//Need to take the fetch images and render them on screen in a list

	//Search Bar Component
		//Just responsible for showing an empty bar at the top of the screen 
		//Anytime user types something search bar handles that event

	//ImageList
		//Takes a list of images and render them out on the screen

	//Structure:
		//All of our componnents will be in the src/components/ directory
		//index.js will still be inside of src directory
			//this is a common pattern to keep all of your components inside of a seperate directory




////////////////////////////////////////////////////////////////////////////////////////////////////
//Showing Forms to the User

	//This is the component we'll make in this directory: src/components/SearchBar.js:
		class SearchBar extends React.Component {
			render(){
				return (
					<form action="submit"><input type="text"/></form>
				);
			}
		}



////////////////////////////////////////////////////////////////////////////////////////////////////
//Adding a touch of style
	//Using the semantic ui <link> tag in the public/index.html file we'll add classes to the searchbar
	//component to add some styling:
		<div className="ui segment">
			<form className="ui form" action="submit">
				<div className="field">
					<label>Image Search</label>
					<input type="text"/>
				</div>
			</form>
		</div>

	//Additionally, in app.js we add some inline styling and a semantic-ui class
	<div className="ui container" style={{marginTop: '10px'}}>
		<SearchBar/>
	</div>



////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating Event Handlers

	//onInputChange(){} ==> this is an event handler we'll use to implement text in the search bar
	//invoking the event handler
		<input type="text" onChange={this.onInputChange}/>
		//note:
			/*this syntax:*/{this.onInputChange()} /*will automatically invoke the function*/

	//event.target.value ==> when we console.log(event.target.value); in onInputChange(){} we see all of
	//the text we put in the search bar will be logged into our console

	//onClick === handles event every time user clicks on something
	//onChange === handles event every time a user enters some text in a text input
	//onSubmit === handles event every time user submits a form

	//REACT COMMUNITY CONVENTION
		//onInputChange(event){} --> it's convention to name event handlers like this, makes it easy for other
		//engineers to understand it's function, sometimes you'd name it something like: handleInputchange(event){}




////////////////////////////////////////////////////////////////////////////////////////////////////
//Alternate Event Handler Syntax
	<input type="text" onChange={(e) => console.log(e.target.value)} />}
	//we will use this anytime we have a single line of code that we want to execute anytime some event occurs
		//better to use this when the element only has one function rather than adding another class




////////////////////////////////////////////////////////////////////////////////////////////////////
//Uncontrolled vs Controlled Elements
	//Controlled vs. Uncontrolled
		//text input is an uncontrolled form element, we prefer to work w/ controller components

	//Refactor from Uncontrolled to Controlled Element

	state = { term: ''};
	//in SearchBar.js before ^^^ render(){} initialize state ^^^
	<input type="text" onChange={((e)=>console.log(e.target.value))} />
	//from SearchBar.js we go from ^^^ this ^^^
	<input type="text" value={this.state.term} onChange={e=>this.setState({ term: e.target.value })} />
	//to ^^^ this ^^^

		onChange={ e => this.setState({ term: e.target.value })}
		/*here we're using an event callback function to set the target in this.state.term*/

		value={this.state.term} 
		/*the value of the input prop is SHOVED into the input*/


	//Previously, our element relied on HTML to retrieve the value of an input (in HTML DOM)
		//we don't want to store data inside the DOM, we want React to be the "sole source of truth" in our app

	//Now React would look at the state object
		//And then see, oh, the value of the input is 'Hi there'
			//this is a much better practice, we want our information stored inside of our components instead of
			//storing it inside the html DOM.

		//One weird thing:
			//even though the input knows what the value is we have to store it in state and pass it to the value prop
			//IN REACT WE WANT TO STORE OUR DATA IN STATE
				//THIS makes certain steps straightforward
					//i.e. if we wanted to make all of the input script show uppercase only we'd simple add this
						<input onChange={e => this.setState({ term: { e.target.value.toUpperCase() } })}/>



////////////////////////////////////////////////////////////////////////////////////////////////////
//Coding Exercise 6 - Controlled Elements

	//Take change event update to read the cV of the input and use it to update our pw piece of state
	//Once we have that updated value we should assign that value prop back to back to the text<input>
		//value prop
		//onChange prop

	//Solution:
		<input 
			type={"password"} 
			onChange={ e => this.setState({ password: e.target.value }) } 
			value={this.state.password} 
		/>




////////////////////////////////////////////////////////////////////////////////////////////////////
//Handling Form Submittal

	//add the onSubmit prop to the <form>tag
	{<form className="ui form" onSubmit={ this.onFormSubmit } action="submit"></form>}/*like so*/

	//Create a function in the SearchBar class called onFormSubmit(){}to handle the form submission
	// onFormSubmit(e){
	// 	e.preventDefault();
		//prevents the form from automatically submitting when the page is rendered, WE WILL ALWAYS USE THIS
		//BY DEFAULT EVERYTIME WE'RE WORKING WITH A FORM TO PREVENT IT FROM SUBMITTING AUTOMATICALLY
	// 	console.log(this.state.term)
	// };
		//however, when we submit the form after adding console.log(this.state.term); we get this error:
			//TypeError: Cannot read property 'state' of undefined
				//shoudl say: 'I CANNOT ACCESS THE PROPERTY STATE ON THE VALUE UNDEFINED'



////////////////////////////////////////////////////////////////////////////////////////////////////
//Understanding the 'this' in JS
	//The root issue here is that JS thinks that the 'this' in this.state.term != class SearchBar 
		//Thinks 'this' === undefined

	//'THIS' in JS
		//Instance of SearchBar
			//state
			//Render
			//onFormSubmit
				//^^^ 'this' means give me reference to the instance of class SearchBar

				//it seems that 'this' only doesn't work inside of onFormSubmit(){}
	
	//An example:
	class Car {
	  setDriveSound(sound) {
	    this.sound = sound;
	  }
	  
	  drive() {
	    return this.sound;
	  }
	}

	const car = new Car();

	car.setDriveSound('vroom');
	car.drive();
	//car.drive(); find function name.
		//look @ dot to the left
			//find the variable 
				//that is the value of the 'this' variable
					//'this' === class instance of car

	const truck = {
	  sound: 'putputput',
	  driveMyTruck: car.drive
	}

	truck.driveMyTruck();

	const drive = car.drive;

	drive();
	//Error
		//Cannot read property 'sound' as undefined

	//This error ^^^ happens for the same reason as ReactJS's error 
		//TypeError: Cannot read property 'state' of undefined ... BECAUSE ...

	//When we pass that callback down into the form element (onSubmit(){})
		//then it gets invoked there is not this.onFormSubmit(){}
			//calls that function on its own just like onSubmit(), this is undefined.
	};




////////////////////////////////////////////////////////////////////////////////////////////////////
//Solving Context Issues
	//Here's the solution to the previous error "Cannot read property 'sound' as undefined" due to 
	//Will help us understand why event handler onFormSubmit() throws errors

	//Solution 1 - bind the function in the constructor(){}
		//When we bind a function, it will produce a new version of that function

	constructor(){
		this.drive = this.drive.bind(this);
		//this.drive.bind(this); creates new function that will always have the correct value of 'this'
			//there 'this' === car
	};

	//Solution 2 - turn onFormSubmit(e){} into an arrow function onFormSubmit = (e) => {};
		//rather than assigning an object we are assigning an arrow function*****

	state = { term: '' }
	onFormSubmit = (e) => {
		e.preventDefault();
	};
			//this makes sure that the value of 'this' is always === our instance of the SearchBar


	//Solution 3 - Define an arrow function and passdown onFormSubmit in the <form>
		//Change onFormSubmit back to this syntax: onFormSubmit(){};
		//notice how our <input/> has a similar looking callback:
		<input 	onChange={ e => this.setState({ term: e.target.value })} />
			//in this case that callback gets passed down using the callback

		<form className="ui form" onSubmit={(e)=> this.onFormSubmit(e)} action="submit"/>
			//we're now defining an arrow function and passing it down in the form
				//--> when form gets submitted it will call the arrow function
					//will only invoke this.onFormSubmit() one time

		//GENERALLY WE'LL USE SOLUTION 2 - assigning an arrow function




////////////////////////////////////////////////////////////////////////////////////////////////////
//Communicating Parent to the Child