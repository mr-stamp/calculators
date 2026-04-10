let _days_elem = document.getElementById("days");
let _grades_elem = document.getElementById("grades-tbl");
let _boost_elem = document.getElementById("boost");

const MAX_DAYS = _days_elem.max;
const MIN_DAYS = _days_elem.min;

_days_elem.addEventListener("change", updateTable);
_boost_elem.addEventListener("change", updateTable);

document.addEventListener("keydown", (e)=>{
  let _days = _days_elem.value;
  if (document.activeElement != _days_elem) {
    if (e.code == "ArrowUp") {
        _days_elem.value = Math.min(Number(_days) + 1, MAX_DAYS);
    } else if (e.code == "ArrowDown") {
        _days_elem.value = Math.max(Number(_days) - 1, MIN_DAYS);
    }
  }

  updateTable();
});

function updateTable() {
    let _tblString = "<tr>";
  
    for (let _i = 2 * _days_elem.value; _i > -2 * _days_elem.value - 1; _i--) {
        if (_i > 0) _tblString+= "<th>" + _i + " \u2B50</th>";
        else if (_i == 0) _tblString+= "<th>" + _i + "</th>";
        else _tblString+= "<th>" + _i + " \u2796</th>";
    }
    
    _tblString+= "</tr><tr>";
    
    for (let _i = 2 * _days_elem.value; _i > -2 * _days_elem.value - 1; _i--) {
        let _calcd = Math.round(80 + 10 * (Number(_i) + Number(_boost_elem.value)) / Number(_days_elem.value));
        _tblString+= "<td>" + _calcd + "%</td>";
    }
    
    _tblString+= "</tr>";
    
    _grades_elem.innerHTML = _tblString;
}


//Grade Percentage Calculator Starts Here
let _missed_elem = document.getElementById("missed");
let _out_of_elem = document.getElementById("out-of");
let _per_tbl_elem = document.getElementById("percent-tbl");

_missed_elem.addEventListener("change", updatePercentTable);
_out_of_elem.addEventListener("change", updatePercentTable);


function updatePercentTable() {
    let _tblString = "<tr><th>Missed: </th><th>Number Correct: </th><th>Percentage: </th></tr>"
    let _out_of = _out_of_elem.value;

    for (let _i = 0; _i <= _out_of; _i++) {
        _tblString+= "<tr id='row" + _i + "'";
        if (_i == _missed_elem.value) _tblString+= "class='highlight-row'";
        _tblString+= "><td>" + _i + "</td><td>" + (Number(_out_of) - Number(_i)) + "</td><td>" + Math.round((1 - Number(_i) / Number(_out_of)) * 100) + "%</td></tr>";
    }
        
    _per_tbl_elem.innerHTML = _tblString;

    _missed_elem.focus();
    _missed_elem.select();

    document.querySelector(".highlight-row").scrollIntoView({behavior: "smooth", block: "center"});
}



