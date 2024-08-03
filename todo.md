## variables
target, a folder
destination, a folder

export_history, a csv file with a structure like this
subfolderName fileName  timeStamp
## function of the script
read the export_history file

scan the target folder for subfolders
  for each subfolder
    scan it for files
        for each file, find out if that file's name is present in export_history,
          if it is, ignore that file. 
          else add that file's name to an array/list
so you have sperate array/list for each subfolder inside the target directory
now display the results to the user is this format.
1st subfolder's name: Number of files in the list
2nd subfolder's name: Number of files in the list
3rd subfolder's name: Number of files in the list
and so on.


make a new folder inside destination folder and name it according to todays date.
then you ask the user for number of files to export from each list.
ask a question like this for each subfolder
How many files to copy from subfolder_name?

make sure the users input is valid, if its bellow or equal to zero, or not a number, do nothing. if it is more than the number of files in the list,  make it equal to number of files in the list. 

after user gives their input, copy the number of files that user wants to the folder you made on todays date and add the name of that file to export history file.

show the progress while copying and when all subfolders are done, dont close the console but show a message that says all folders finished 