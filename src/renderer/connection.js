/**
 *  SAVE INTO DATABASE
 *
 */
const loki = require('lokijs');
var location = null;
var rooms = null;
var system = null;

// We will use autoload (one time load at instantiation), and autosave  with 4 sec interval.
var db = new loki('database.json', {
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true,
	autosaveInterval: 4000 // save every four seconds for our example
});

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
  // on the first load of (non-existent database), we will have no collections so we can
  //   detect the absence of our collections and add (and configure) them now.
  location = db.getCollection("locations");
  if (location === null) {
    location = db.addCollection("locations");
  }
  rooms = db.getCollection("rooms");
  if (rooms === null) {
    rooms = db.addCollection("rooms");
  }
  system = db.getCollection("system");
  if (system === null) {
    system = db.addCollection("system");
  }
  // kick off any program logic or start listening to external events
  database();
}

// While we could have done this in our databaseInitialize function,
//   lets split out the logic to run 'after' initialization into this 'runProgramLogic' function
export function database() {
  // location = db.getCollection("location");
  // console.log("Number of location in database : " + location.count());
  // rooms = db.getCollection("rooms");
  // console.log("Number of rooms in database : " + rooms.count());
  // system = db.getCollection("system");
  // console.log("Number of system in database : " + system.count());
  return db;
}
