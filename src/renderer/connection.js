/**
 *  SAVE INTO DATABASE
 *
 */
const loki = require('lokijs');
var hosts = null;
var rooms = null;
var consumption = null;


// We will use autoload (one time load at instantiation), and autosave  with 4 sec interval.
var db = new loki('database.json', {
	autoload: true,
	autoloadCallback : database,
	autosave: true,
	autosaveInterval: 4000 // save every four seconds for our example
});

export function database() {
  hosts = db.getCollection("hosts");
  if (hosts === null) {
    hosts = db.addCollection("hosts");
  }
	rooms = db.getCollection("rooms");
  if (rooms === null) {
    rooms = db.addCollection("rooms");
  }
	consumption = db.getCollection("consumption");
	if (consumption === null) {
		consumption = db.addCollection("consumption");
	}

  return {
    rooms:rooms,
		hosts: hosts,
    consumption: consumption,
  };
}
