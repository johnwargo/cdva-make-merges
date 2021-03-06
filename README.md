# Cordova Make Merges (cdva-merges)

A node module that automates the creation of a Cordova project's merges folders, using the project's list of platforms as a guide.

Earlier versions of the Cordova CLI included the merges folder in the default project structure it created. For some bizarre reason, the Cordova Dev team thought that removing the merges folder would be less confusing for users. So, the merges folder no longer exists, and is no longer even documented. To use this feature, you'll have to manually create folders for each target platform or use this module.

Using `cdva-merges`, a developer can automatically create merges folders for each of the target platforms currently configured for a Cordova project. Simply issue the command and it's done for you.

## Installation

To install the module, open a terminal window and execute the following command:

	npm install -g cdva-merges

## Usage

Execute the module by executing the `cdva-merges` command at a command-line. 

The module accepts the following command-line switch:

`?` - Display the help file

**Examples:**

To display this help file, issue the following command:

    cdva-merges ?
	
To create merges folders for each platform added to a Cordova application project use the following command:

    cdva-merges

The module will read the Cordova project's configuration to determine which platforms have been added then make sure the merges folder exists (if not, it will create it for you), then create a folder in the merges folder for each platform.

***

You can find information on many different topics on my [personal blog](http://www.johnwargo.com). Learn about all of my publications at [John Wargo Books](http://www.johnwargobooks.com).

If you find this code useful and feel like thanking me for providing it, please consider <a href="https://www.buymeacoffee.com/johnwargo" target="_blank">Buying Me a Coffee</a>, or making a purchase from [my Amazon Wish List](https://amzn.com/w/1WI6AAUKPT5P9).
            
