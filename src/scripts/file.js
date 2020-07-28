let read = (fileObj, callback) => {
  let reader = new FileReader();
  reader.readAsText(fileObj);
  reader.onload = () => {
    callback(reader.result);
  };
};

let tabulate = (data, rowLength) => {
  console.log("tabulate() raw: ", data);
  //console.log(data.length);
  let headers = [];
  for (let i = 0; i < rowLength; i++) headers.push("COL" + i);
  let content = [];
  let col = 0;
  let obj = {};
  for (let i = 0; i < data.length; i++) {
    obj[headers[col]] = {
      code: data.charCodeAt(i),
      char: data.charAt(i),
      hex: Number(data.charCodeAt(i)).toString(16)
    };
    col += 1;
    if (col === rowLength) {
      content.push(obj);
      col = 0;
      obj = {};
    }
  }

  let extras = rowLength - (data.length % rowLength);
  for (let i = 0; i < extras; i++) {
    obj[headers[col]] = { code: "**", char: "**", hex: "**" };
    col += 1;
  }
  content.push(obj);

  console.log(headers, content);
  return { headers: headers, content: content };
};

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
let CSVToArray = (strData, strDelimiter) => {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
};

export { read, tabulate, CSVToArray };
