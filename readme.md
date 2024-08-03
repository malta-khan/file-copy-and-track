# File Copy and Track

## Purpose
User wants to have control over what what media their kids can consume. User has blocked acces to online content youtube/netflix and downloaded hundreds of episodes of cartoons/anime/tv curated for kids on their local drive. They want to copy the media to kid's devices, but not all in one go. Instead they want to "release" a number of episodes from each series weekly and keep track of which episodes they have released and which ones are still new/fresh for kids.

## How this script Works?
User stores all of media in this structure
    main folder
    -series folder
      -episode file

The script asks the user for how many files to copy from each series. 
Those files are then copied to a specific export directory. 
To prevent same files being copied again and again, the original files are renamed with a prefix after copying and those files do not appear in the next scan. 

## before you run this script 
you need to 
  install nodeJs
  install readline-sync npm module
  edit the script and update the path to main folder and export folders 

## caution 
This script will rename the original files with a prefix. Make sure to backup your files if file names are important for you. Or you can use a batch renaming tool to remove the prefixes manually