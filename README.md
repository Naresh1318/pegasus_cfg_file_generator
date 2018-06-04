# Pegasus Configuration File Generator

Helps you easily generate configuration file for Pegaus.

Get access to the hosted webpage here: naresh1318.pythonanywhere.com

## Installation:
```bash
pip install -r requirements.txt
```

## Running
Just run `app.py` and you should be good to go!

## Assumptions
* All parameters for all the micros remain the same. 
* All parameters for all the macros also remain the same.

## Usage
1. Gave a name to the configuration file.
2. Modify the micro and macro parameters to the desired values.
3. Add channels by entering the first channel name followed by the number of channels needed and 
git Add Channel.

Ex: name -> "Amg-1LD1", number of channels -> 10. This generates 10 channels with
name "Amg-1LD1", "Amg-1LD2", ... ,"Amg-1LD10".

4. Add all the desired channels, use the undo button if needed. (***Undo only removes the last added channel. If want an earlier channel to me modified then you are out of luck, just start again.***)
5. Hit Download to get the cfg file.
6. Modify the data storage path to the desired value after you download the file.
