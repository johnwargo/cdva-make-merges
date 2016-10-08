#!/usr/bin/env node

//========================================================================
// Cordova-make-merges
//
// A node command for creating the Cordova merges for a project
//
// by John M. Wargo (www.johnwargo.com)
//========================================================================
//*************************************
//some constants
//*************************************
var colors = require('colors');
var fs = require('fs');
var path = require('path');

//Change debug to false for production use
var debug = false;

//Displayed by the -v command-line switch
var appVersion = "0.0.1";
//Get the current folder
var currFolder = process.cwd();
//figure out what the target merges folder is
var mergesFolder = path.join(currFolder, 'merges');
//and the platforms folder
var platformsFolder = path.join(currFolder, 'platforms');
//Used to store the list of all folders that will be created
var folderList = [];
var theStars = "*************************************";

function listArray(theName, theArray) {
  if (theArray.length > 0) {
    //Write the contents of an array to the console
    console.log("\n%s Array Contents", theName);
    for (i = 0; i < theArray.length; i++) {
      console.log("%s[%s]: '%s'", theName, i, theArray[i]);
    }
  } else {
    console.log('\n%s array is empty', theName);
  }
}

//===================================================================
// Simple function to check for a value in an array
//===================================================================
function checkValue(theArray, theVal) {
  return (theArray.indexOf(theVal) > -1);
}

//===================================================================
// Figure out if this thing 'feels' like a Cordova project folder
//===================================================================
function isCordovaProjectFolder() {

  //Validate the file path exists
  function checkPath(filePath) {
    //console.log('Checking for %s', filePath);
    if (fs.existsSync(filePath)) {
      console.log('Found: %s', filePath);
      return true;
    } else {
      console.log('Missing: %s'.yellow, filePath);
      return false;
    }
  }

  console.log('Validating Cordova project folder contents:');
  //Do our check of all the required paths
  //The code will kick out at the first failure
  return (checkPath(path.join(currFolder, 'config.xml')) && checkPath(path.join(currFolder, 'www')) &&
  checkPath(path.join(currFolder, 'platforms')));
}

//===================================================================
// Grabs the list of folders in the project's platforms folder
//===================================================================
function getPlatformsFolderList() {

  function whackItem(theList, key) {
    var idx = theList.indexOf(key);
    if (idx > -1) {
      theList.splice(idx);
    }
  }

  //We know the folder exists, so go read the folder's contents
  console.log('Checking platforms folder contents');
  folderList = fs.readdirSync(platformsFolder);
  //Next strip the '.' entry
  whackItem(folderList, '.');
  //and the '..' entry
  whackItem(folderList, '..');
  //Write the folder list to the screen
  if (debug) {
    listArray('Folders', folderList);
  }
  //return what's left
  return folderList;
}

function makeFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    //No? Then create the folder
    console.log('Creating "%s"'.green, folderPath);
    fs.mkdirSync(folderPath);
  } else {
    //Yes? Then skip it.
    console.log('Skipping "%s", already exists'.yellow, folderPath);
  }
}

//========================================================================
//Write out what we're running
//========================================================================
console.log("\n%s".green, theStars);
console.log("* Cordova Make Merges (cdva-merges) *".green);
console.log("%s".green, theStars);
console.log('Current folder: %s', currFolder);

//========================================================================
//Sort out the command line arguments
//========================================================================
var userArgs;
//Is the first item 'node' or does it contain node.exe? Then we're testing!
//Yes, I could simply look for the word 'node' in the first parameter, but these
//are two specific cases I found in my testing, so I coded specifically to them.
if (process.argv[0].toLowerCase() === 'node' || process.argv[0].indexOf('node.exe') > -1) {
  //if (process.argv[0].toLowerCase() == 'node') {
  //whack the first two items off of the list of arguments
  //This removes the node entry as well as the cordova-create entry (the
  //program we're running)
  userArgs = process.argv.slice(2);
} else {
  //whack the first item off of the list of arguments
  //This removes just the cva-create entry
  userArgs = process.argv.slice(1);
}
//What's left at this point is just all of the parameters
//If debug mode is enabled, print all of the parameters to the console
if (debug) {
  listArray('Arguments', userArgs);
}

//========================================================================
//Do we have switches on the command line?
//========================================================================
//look for ? as a command switch
if (checkValue(userArgs, '?')) {
  //read the help file
  var raw = fs.readFileSync(path.join(__dirname, 'help.txt')).toString('utf8');
  //write the contents of the help file to the console
  console.log(raw);
  process.exit(1);
}
//Look for -v on the command line
if (checkValue(userArgs, '-v')) {
  console.log('Cordova Make Merges (cdva-merges) Version %s\n', appVersion);
  process.exit(1);
}

//Are we in a Cordova project folder?
if (isCordovaProjectFolder()) {
  //Houston, we have a Cordova project folder
  console.log('Confirmed Cordova project folder');
  //Get the list of platforms added to the project
  folderList = getPlatformsFolderList();
  //See if we have any folders to process
  if (folderList.length > 0) {
    console.log('Found %s platforms, creating folders:', folderList.length);
    //Do we have a merges folder? Make it if not
    makeFolder(mergesFolder);
    //Create the other folders we need 
    for (var i = 0; i < folderList.length; i++) {
      //Process the folder
      makeFolder(path.join(mergesFolder, folderList[i]));
    }
  } else {
    //No folders to process  
    console.error("The Cordova project does not contain any platforms.".yellow);
    console.error("\nPlease add one or more platforms to the project and try again.");
    process.exit(1);
  }
} else {
  console.error("This folder is not a Cordova project folder.".red);
  console.error("\nPlease navigate to a Cordova project folder and try again.");
  process.exit(1);
}

//We made it this far, so we must have done something
console.log("\nAll done!");