### event_app_back_end

An application for creating and booking virtual events.

#### Description
<b>event_app_back_end</b> is the backend application for the Event application which allows users to create and book events.

#### Set up

##### Dependencies
* NodeJs
* Express
* GraphQl
* Mongoose
* MongoDB

#### Getting Started
Follow the steps below to set up the project

Install Nodejs<br/>
* Clone the repository by running the command
`https://github.com/mikenthiwa/event_app_back_end.git`
* Run `cd event_app_back_end` to enter application directory.<br/>
* Install application dependencies by running the command<br/>
`yarn install`
* Create a .env file in the root of your directory using the .env-example file in the repository.
* Start the application by running
    `yarn start:dev`
* Go to the browser and enter: 
`http:127.0.0.1:8000/graphql`

#### Authentication:
* Register or login to obtain token
* Copy token and add it to the section of headers in the graphql playground:
`{"authorization": "token"}`

####Environment Variables:
Create your .env file in the root directory by following the .env.example below

PORT=8000
SECRET_KEY=12345
DBURI=mongodb+srv://admin:Kenya2019@cluster0-9lrtb.mongodb.net/Event_DB?retryWrites=true&w=majority


