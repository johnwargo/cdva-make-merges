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
var colors = require('colors'),
  fs = require('fs'),
  path = require('path');

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
var theStars = "************************************";

//function listArray(theName, theArray) {
//  if (theArray.length > 0) {
//    //Write the contents of an array to the console
//    console.log("\n%s Array Contents", theName);
//    for (i = 0; i < theArray.length; i++) {
//      console.log("%s[%s]: '%s'", theName, i, theArray[i]);
//    }
//  } else {
//    console.log('\n%s array is empty', theName);
//  }
//}

//===================================================================
// Simple function to check for a value in an array
//===================================================================
function checkValue(theArray, theVal) {
  return (theArray.indexOf(theVal) > -1);
}

//===================================================================
// Figure out if this thing 'feels' like a Cordova project folder
//===================================================================
function isCorddovaProjectFolder() {
  //Validate the file path exists
  function checkPath(filePath) {
    console.log('Checking for %s', filePath);
    if (fs.existsSync(filePath)) {
      console.log("Found it!".green);
      return true;
    } else {
      console.log("File path not found\n".red);
      return false;
    }
  }
  //Do our check of all the required paths
  return (checkPath(path.join(currFolder, 'config.xml')) && checkPath(path.join(currFolder, 'www')) && checkPath(path.join(currFolder, 'platforms')));
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
  console.log('\nSearching %s', platformsFolder);
  folderList = fs.readdirSync(platformsFolder);
  //Next strip the '.' entry
  whackItem(folderList, '.');
  //and the '..' entry
  whackItem(folderList, '..');
  //Write the folder list to the screen
  //listArray('Folders', folderList);
  //and return what's left
  return folderList;
}

function makeFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    //No? Then create the folder
    console.log('Creating %s', folderPath);
    fs.mkdirSync(folderPath);
  } else {
    //Yes? Then skip it.
    console.log('Skipping %s'.yellow, folderPath);
  }
}

//========================================================================
//Write out what we're running
//========================================================================
console.log("\n%s".green, theStars);
console.log("* Cordova Make Merges (cdvamerges) *".green);
console.log("%s".green, theStars);

console.log('Current folder: %s', currFolder);
console.log('Merges folder: %s', mergesFolder);
console.log('Platforms folder: %s\n', platformsFolder);

//========================================================================
//Sort out the command line arguments
//========================================================================
var userArgs;
//Is the first item 'node'? then we're testing
if (process.argv[0].toLowerCase() == 'node') {
  //whack the first two items off of the list of arguments
  //This removes the node entry as well as the module name
  //This should only apply during testing
  userArgs = process.argv.slice(2);
} else {
  //whack the first item off of the list of arguments
  //This removes just the module name
  userArgs = process.argv.slice(1);
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
  console.log('Cordova Make Merges (cdvamerges) Version %s\n', appVersion);
  process.exit(1);
}

//Are we in a Cordova project folder?
if (isCorddovaProjectFolder()) {
  //Houston, we have a Cordova project folder
  console.log('Folder looks like a Cordova project folder.');
  //Get the list of platforms added to the project
  folderList = getPlatformsFolderList();
  //See if we have any folders to process
  if (folderList.length > 0) {
    //Do we have a merges folder? Make it if not
    makeFolder(mergesFolder);
    //Create the other folders we need 
    for (var i = 0; i < folderList.length; i++) {
      //Process the folder
      makeFolder(path.join(mergesFolder, folderList[i]));
    }
  } else {
    //No folders to process  
    console.error("\nNo platforms folders to process\n".red);
  }
} else {
  console.error("This folder doesn't look like it's a Cordova project folder.\n".red);
  process.exit(1);
}

//We made it this far, so we must have done something
console.log("All done!");