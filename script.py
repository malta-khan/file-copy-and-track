import os
import shutil
from pathlib import Path

# Define source and destination paths
main_folder = Path("D:/Media/Cartoons")
export_folder = Path("F:/Exported")

# Create the destination folder if it does not exist
export_folder.mkdir(parents=True, exist_ok=True)

def scan_files(directory):
    file_list = []
    # Get all subfolders, excluding "LONG"
    for folder in directory.iterdir():
        if folder.is_dir() and folder.name != "LONG":
            files = [f for f in folder.iterdir() if f.is_file()]
            file_details = {
                'folder_name': folder.name,
                'file_count': len(files),
                'files': [f.name for f in files]
            }
            file_list.append(file_details)
    return file_list

def pick_files(file_list):
    file_paths = []
    for sub_folder in file_list:
        number = int(input(f"How many files from {sub_folder['folder_name']}? ({sub_folder['file_count']} available)\n"))
        picked_files = sub_folder['files'][:number]
        for file_name in picked_files:
            file_path = main_folder / sub_folder['folder_name'] / file_name
            file_paths.append(file_path)
            print(file_name)
        print(f"Selected {len(picked_files)} files from {sub_folder['folder_name']}\n")
    return file_paths

def copy_files(file_paths):
    for file_path in file_paths:
        try:
            destination_path = export_folder / file_path.name
            shutil.copy(file_path, destination_path)
            print(f"File copied successfully: {file_path}")
        except Exception as e:
            print(f"Error copying file: {e}")

# Start the process
scan_results = scan_files(main_folder)
file_paths = pick_files(scan_results)
copy_files(file_paths)
