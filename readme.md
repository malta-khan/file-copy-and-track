# File Copy and Track

## Purpose
User wants to have controll over what what media their kids can consume. User has blocked acces to online content/youtube/netflix and downloaded hundreds of episodes of cartoons/anime/tv curated for kids. They want to copy the media to kid's devices, but not all in one go. Instead they want to "release" a number of episodes from each show weekly and keep track of which episodes they have released and which ones are still new/fresh for kids.

## How it Works?
There is a main folder inside of which there are subFolders for each tv show. The subfolder contains the video files
The script scans the main folder and its subfolders. 
Then it asks the user for how many files to copy from each folder. 
Those files are then copied to export directory. 
To prevent same files being copied again and again, a prefix is added to fileNames and those files do not appear in the next scan. 