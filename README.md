Cordova Make Merges (cdvamerges)
================================
Automates the creation of a Cordova project's merges folders, using the list of platforms as a guide.

Earlier versions of the Cordova CLI included the merges folder in the default project structure it created. For some bizarre reason, the Cordova Dev team thought that removing the merges folder would be less confusing for users. So, the merges folder no longer exists and the user has to manually create folders for each target platform.

Using cdvamerges, a developer can automatically create merges folders for each of the target platforms currently configured for a Cordova project. Simply issue the command and it's done for you.

Switches
--------

The module accepts the following command-line switches:

`-v`: Show module version on the terminal

`?`: Display the help file

Usage
-----

To display this help file, issue the following command:

    cdvamerges ?

To display the application version, use the following command:

    cdvamerges -v
	
To create merges folders for each platform added to a Cordova application project use the following command:

    cdvamerges

The module will read the Cordova project's configuration to determine which platforms have been added then make sure the merges folder exists (if not, it will create it for you), then create a folder in the merges folder for each platform.

* * *
By [John M. Wargo](http://www.johnwargo.com) - if you like and/or use this module, why not pick up [one of my books](http://www.johnwargobooks.com)?
