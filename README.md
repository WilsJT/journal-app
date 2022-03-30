# Journal-app

## Overview
Journal-app is a digital journal which tells current weather information and manages plans to easily identify tasks and events. All components and styling were written from scratch without the use of material-ui or other external libraries/frameworks, with exception to the [calendar](https://www.npmjs.com/package/react-calendar).

Deploy version: [journal-app](https://WilsJT.github.io/journal-app)

## Tools
<ul>
  <li>JavaScript</li>
  <li>React</li>
  <li>CSS</li>
  <li>OpenWeathermap API</li>
  <li>react-calendar</li>
 </ul>

## Flow map
![App-flow](https://user-images.githubusercontent.com/69861524/160769883-6e43658a-0341-4ab2-a41e-97c2731139f1.jpg)

## Functionality
### Update Weather:<br/>
Searches for location and updates weather information
<ol>
  <li>Type in location</li>
  <li>Press "enter" or search button</li>
</ol>

<img src="https://user-images.githubusercontent.com/69861524/160788196-f4b3b472-de85-43af-86d3-1de6d5769f98.gif" width="800" height="450" />

### Editing notes:<br/>
Add or delete notes
<ol>
  <li>Click date on calendar to edit notes on</li>
  <li>Press edit button</li>
  <li>Add notes text area and press "enter" or '+' button to add or delete notes using 'X' buttons</li>
  <li>Press done or select a new date</li>
</ol>

<img src="https://user-images.githubusercontent.com/69861524/160788241-39c6b762-3300-468a-9a78-c62feb234ef4.gif" width="800" height="450" />

### Deleting past notes:<br/>
Clears local storage and removes any notes for every date before the present date
<ol>
  <li>Press "Delete Past Notes" button</li>
</ol>

<img src="https://user-images.githubusercontent.com/69861524/160788278-21b4fcbf-fbce-4fd1-a28b-4e5287ecc8b0.gif" width="800" height="450" />
