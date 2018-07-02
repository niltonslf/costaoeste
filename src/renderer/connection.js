/**
 *  SAVE INTO DATABASE
 *
 */
const loki = require('lokijs');
var locations = null;
var rooms = null;

// We will use autoload (one time load at instantiation), and autosave  with 4 sec interval.
var db = new loki('database.json', {
	autoload: true,
	autoloadCallback : database,
	autosave: true,
	autosaveInterval: 4000 // save every four seconds for our example
});


export function database() {
  locations = db.getCollection("locations");
  if (locations === null) {
    locations = db.addCollection("locations");
  }
  rooms = db.getCollection("rooms");
  if (rooms === null) {
    rooms = db.addCollection("rooms");
  }
  return {
    rooms:rooms,
    hosts: locations,
  };
}
