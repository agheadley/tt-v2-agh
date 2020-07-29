let store = {};

store.settings = {};

store.data = {};

store.active = {
  isActive: false,
  week: null,
  row: null,
  col: null,
  name: null,
  setInfo: null,
  staffInfo: null,
  roomInfo: null
};

store.init = {
  name: "timetable1",
  years: [
    { id: 0, name: "13" },
    { id: 1, name: "12" },
    { id: 2, name: "11" },
    { id: 3, name: "10" },
    { id: 4, name: "X" }
  ],
  weeks: [{ id: 0, name: "A" }, { id: 1, name: "B" }],
  blocks: [
    { name: "A", color: "#ffdddd" },
    { name: "B", color: "#ddffdd" },
    { name: "C", color: "#ddddff" }
  ],
  lessons: [
    { day: "M", period: "1", id: 1, week: "A", block: "A" },
    { day: "M", period: "2", id: 2, week: "A", block: "" },
    { day: "M", period: "3", id: 3, week: "A", block: "A" },
    { day: "M", period: "4", id: 4, week: "A", block: "A" },
    { day: "Tu", period: "1", id: 5, week: "A", block: "B" },
    { day: "Tu", period: "2", id: 6, week: "A", block: "A" },
    { day: "Tu", period: "3", id: 7, week: "A", block: "B" },
    { day: "Tu", period: "4", id: 8, week: "A", block: "C" },
    { day: "W", period: "2", id: 9, week: "B", block: "B" },
    { day: "Th", period: "3", id: 10, week: "B", block: "C" }
  ],
  checks: { subject: false, staff: false, rooms: false },
  subjects: [
    { department: "ENG", subject: "E" },
    { department: "ENG", subject: "Eli" },
    { department: "MAT", subject: "M" },
    { department: "CHE", subject: "C" }
  ],
  rooms: [
    { department: "ENG", room: "E1" },
    { department: "ENG", room: "E2" },
    { department: "MAT", room: "M1" },
    { department: "CHE", room: "C1" }
  ],
  staff: [
    { name: "Anthony", initials: "AGH" },
    { name: "Anthony", initials: "AAA" },
    { name: "Anthony", initials: "BBB" }
  ]
};

let init = () => {
  store.settings = JSON.parse(JSON.stringify(store.init));

  if ("settings" in window.localStorage) {
    store.settings = JSON.parse(window.localStorage.getItem("settings"));
  }

  store.data.weeks = [];
  for (let week of store.settings.weeks) {
    let weekObj = {
      name: week.name,
      id: week.id,
      headers: [],
      blocks: [],
      rows: []
    };
    for (let lesson of store.settings.lessons) {
      if (lesson.week === week.name) {
        let obj = {};
        obj.name = lesson.day + lesson.period;
        obj.day = lesson.day;
        obj.period = lesson.period;
        obj.id = lesson.id;
        obj.block = lesson.block;
        weekObj.headers.push(obj);
      }
    }
    for (let block of store.settings.blocks) {
      for (let [i, header] of weekObj.headers.entries()) {
        if (block.name === header.block) {
          weekObj.blocks.push({
            headersIndex: i,
            block: block.name,
            name: header.name,
            id: header.id
          });
        }
      }
    }
    store.data.weeks.push(weekObj);
  }

  if ("data" in window.localStorage) {
    store.data = JSON.parse(window.localStorage.getItem("data"));
  }

  console.log("init()", store.data.weeks);
};

let resetSettings = () => {
  window.localStorage.removeItem("settings");
  init();
};

let resetData = () => {
  window.localStorage.removeItem("data");
  init();
};

let getSettings = () => {
  return JSON.parse(JSON.stringify(store.settings));
};

let setSettings = settings => {
  store.settings = settings;
  window.localStorage.setItem("settings", JSON.stringify(store.settings));
};

let getData = () => {
  return JSON.parse(JSON.stringify(store.data));
};

let setData = data => {
  store.data = data;
  window.localStorage.setItem("data", JSON.stringify(store.data));
};

let addRow = (weekIndex, yearIndex) => {
  let row = [];
  for (let lesson of store.data.weeks[weekIndex].headers) {
    row.push({
      name: lesson.name,
      id: lesson.id,
      setInfo: "",
      staffInfo: "",
      roomInfo: "",
      subject: "",
      error: []
    });
  }

  store.data.weeks[weekIndex].rows.push({
    year: store.settings.years[yearIndex],
    data: row
  });
  window.localStorage.setItem("data", JSON.stringify(store.data));
  console.log("addRow()", store.data.weeks);
};

let setActive = (week, row, col) => {
  console.log("setActive()", week, row, col);
  store.active.isActive = true;
  store.active.week = week;
  store.active.row = row;
  store.active.col = col;
  store.active.setInfo = store.data.weeks[week].rows[row].data[col].setInfo;
  store.active.staffInfo = store.data.weeks[week].rows[row].data[col].staffInfo;
  store.active.roomInfo = store.data.weeks[week].rows[row].data[col].roomInfo;
  store.active.name =
    "(" +
    store.data.weeks[week].name +
    ")" +
    store.data.weeks[week].rows[row].year.name;
  store.active.name += " " + store.data.weeks[week].rows[row].data[col].name;
};

let getActive = () => {
  return JSON.parse(JSON.stringify(store.active));
};

let storeActive = (setInfo, staffInfo, roomInfo) => {
  store.data.weeks[store.active.week].rows[store.active.row].data[
    store.active.col
  ].setInfo = setInfo;
  store.data.weeks[store.active.week].rows[store.active.row].data[
    store.active.col
  ].staffInfo = staffInfo;
  store.data.weeks[store.active.week].rows[store.active.row].data[
    store.active.col
  ].roomInfo = roomInfo;

  store.data.weeks[store.active.week].rows[store.active.row].data[
    store.active.col
  ].subject = setInfo.split("/")[0];

  // clear errors
  for (let row of store.data.weeks[store.active.week].rows) {
    row.data[store.active.col].error = [];
  }
  // set 'error' property on any staff/room clashes in the periods
  let staffArr = store.data.weeks[store.active.week].rows.map(
    el => el.data[store.active.col].staffInfo
  );
  let roomArr = store.data.weeks[store.active.week].rows.map(
    el => el.data[store.active.col].roomInfo
  );
  console.log(staffArr, roomArr);

  var found = [];

  for (let [index, item] of staffArr.entries()) {
    console.log(index, item);
    if (staffArr.filter(el => el === item && item.length).length > 1) {
      found.push(index);
      store.data.weeks[store.active.week].rows[index].data[
        store.active.col
      ].error.push("staff");
    }
  }

  for (let [index, item] of roomArr.entries()) {
    console.log(index, item);
    if (roomArr.filter(el => el === item && item.length).length > 1) {
      found.push(index);
      store.data.weeks[store.active.week].rows[index].data[
        store.active.col
      ].error.push("room");
    }
  }

  store.active = {
    isActive: false,
    week: null,
    row: null,
    col: null,
    name: null,
    setInfo: null,
    staffInfo: null,
    roomInfo: null
  };

  window.localStorage.setItem("data", JSON.stringify(store.data));
};

export {
  init,
  getSettings,
  setSettings,
  getData,
  setData,
  addRow,
  setActive,
  getActive,
  storeActive,
  resetSettings,
  resetData
};
