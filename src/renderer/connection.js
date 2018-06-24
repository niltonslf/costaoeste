/**
 *  SAVE INTO DATABASE
 *
 */
const loki = require('lokijs');
var location = null;
var rooms = null;

// We will use autoload (one time load at instantiation), and autosave  with 4 sec interval.
var db = new loki('database.json', {
	autoload: true,
	autoloadCallback : database,
	autosave: true,
	autosaveInterval: 4000 // save every four seconds for our example
});


export function database() {
  location = db.getCollection("locations");
  if (location === null) {
    location = db.addCollection("locations");
  }
  rooms = db.getCollection("rooms");
  if (rooms === null) {
    rooms = db.addCollection("rooms");
  }

  return {
    rooms:rooms,
    location: location,
  };
}
