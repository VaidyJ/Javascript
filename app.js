// from data.js
var tableData = data;

// YOUR CODE HERE!

var button = d3.select('#filter-btn');
console.log("Button = ", button);

//var ufoTable = d3.select("#ufo-table");
var ufoTable = d3.select("tbody");
var dropDown = d3.select("select");

dateFilter = d3.select("#datetime").property("value");
// console.log("date = ", dateFilter);

//Following code fetches distinct shapes and creates a drop down of the distict shapes

var Shapes = data.map(item => item.shape);
var distinctShapes = [...new Set(Shapes)]

console.log('Shapes = ', distinctShapes);

dropDown.append('option').text('');
for(var i = 0; i < distinctShapes.length; i++) {
    // var opt = document.createElement('option');
    // opt.value = distinctShapes[i];
    dropDown.append('option').text(distinctShapes[i]);
}

// console.log('data = ', data);

//This is to represent cities in title case

function titleCase(txt)
{
    splitString = txt.split(' ');
    returnvalue = '';
    for (i of  splitString)
    {
        returnvalue = returnvalue + i.charAt(0).toUpperCase() + i.substr(1).toLowerCase() + ' ';
    }
    
    return returnvalue;
    
}

function loadTable(item)
    {
        // var rowCount = ufoTable.rowCount;
        // console.log("Rowcount =", rowCount);
        // for (var i = 0; i < rowCount; i++) {
        //     ufoTable.deleteRow;
        // }

        // ufoTable.deleteRow;

        

        ufoTable.append('tr');
        dateValue = item.datetime;
        ufoTable.append('td').text(dateValue);
        cityValue = titleCase(item.city);
        ufoTable.append('td').text(cityValue);
        stateValue = item.state.toUpperCase();
        ufoTable.append('td').text(stateValue);
        countryValue = item.country.toUpperCase();
        ufoTable.append('td').text(countryValue);
        shapeValue = titleCase(item.shape);
        ufoTable.append('td').text(shapeValue);
        durationMinutesValue = item.durationMinutes;
        ufoTable.append('td').text(durationMinutesValue);
        commentsValue = item.comments
        ufoTable.append('td').text(commentsValue);
    }

;

//Intial page will load with all records

data.forEach(loadTable);

button.on("click", function() {

    // Select the input element and get the raw HTML node
    // # to be used if we search by ID
    
    ufoTable.html('');

    var inputElement = d3.select('#datetime')
    var inputElement1 = d3.select('#city')
    var inputElement2 = d3.select('#state')
    var inputElement3 = d3.select('#country')
  
    // Get the value property of the input elements
  
    var inputValue = inputElement.property('value').toLowerCase().trim();
    var inputValue1 = inputElement1.property('value').toLowerCase().trim();
    var inputValue2 = inputElement2.property('value').toLowerCase().trim();
    var inputValue3 = inputElement3.property('value').toLowerCase().trim();    
    
    var inputShape = dropDown.property('value').toLowerCase();

    // Following code removes leading zeros of input dates and creates another string. THis is to ensure that a 01/02/2010 is treated as 
    //1/2/2010 since that is the way the data is stored in the tab.
    
    splitInputDate = inputValue.split('/').map( item => parseInt(item)).join('/')

    console.log('Split Value = ', splitInputDate);
    console.log('Value = ', inputValue);
    console.log('Value = ', inputValue1);
    console.log('Value = ', inputValue2);
    console.log('Value = ', inputValue3);
    console.log('Shapes = ', inputShape);
    
    //filteredData = data.filter(item => (item.datetime === inputValue) && (item.shape === inputShape) );
    //filteredData = data.filter(item => (item.datetime === inputValue) && (item.city === inputValue1) && (item.state === inputValue2) && (item.country === inputValue3) && (item.shape === inputShape) );
    
    filteredData = data


    if (inputValue.length != 0) {filteredData = data.filter(item => (item.datetime === splitInputDate));}
    if (inputValue1.length != 0) {filteredData = filteredData.filter(item => (item.city.toLowerCase() === inputValue1));}
    if (inputValue2.length != 0) {filteredData = filteredData.filter(item => (item.state.toLowerCase() === inputValue2));}
    if (inputValue3.length != 0) {filteredData = filteredData.filter(item => (item.country.toLowerCase() === inputValue3));}
    if (inputShape.length != 0) {filteredData = filteredData.filter(item => (item.shape.toLowerCase() === inputShape));}
        

    console.log(filteredData);

    filteredData.forEach(loadTable);
  
    // BONUS: Calculate summary statistics for the age field of the filtered data
  
    });
  
  
  
  
  
  
