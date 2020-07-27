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

export { read, tabulate };
