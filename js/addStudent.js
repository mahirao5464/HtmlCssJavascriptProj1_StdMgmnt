var srNo = 0;
var students = [];
function addStudent() {
  // Getting save btn ref in js
  const saveButtonRef = document.getElementById("save-btn");
  // adding click event handler to save button
  saveButtonRef.addEventListener("click", saveButtonClickHandler);
}
// save button click handler
function saveButtonClickHandler(event) {
  let isStudentValid = isStudentFormValid();
  if (!isStudentValid) {
    var alertElmRef = document.querySelector("div.alert-class");
    alertElmRef.style.display = "block";
    return;
  }
  const fullName = document.getElementById("fullName").value;
  const fatherName = document.getElementById("fatherName").value;
  const motherName = document.getElementById("motherName").value;
  const dob = document.getElementById("dob").value;

  var newStudent = {
    rollNumber: ++srNo,
    fullName: fullName,
    fatherName: fatherName,
    motherName: motherName,
    dob: dob,
  };
  students.push(newStudent);
  renderTable(newStudent);
}
function renderTable(el) {
  const tableBodyElmRef = document.getElementById("studentTableBody");

  let rowTemplate = `<tr>
              <th scope="row">${el.rollNumber}</th>
              <td>${el.fullName}</td>
              <td>${el.fatherName}</td>
              <td>${el.motherName}</td>
              <td>${el.dob}</td>
              <td>
                <button type="button" class="btn btn-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#editModal"  id="editStudent${el.rollNumber}" onclick="showEditModal(this)" student-index = "${el.rollNumber}">Edit</button>
                <button type="button" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>`;

  tableBodyElmRef.innerHTML += rowTemplate;
  document.querySelector("form").reset();
}

function isStudentFormValid() {
  const fullName = document.getElementById("fullName").value;
  const fatherName = document.getElementById("fatherName").value;
  const motherName = document.getElementById("motherName").value;
  const dob = document.getElementById("dob").value;

  if (fullName == "" || fatherName == "" || motherName == "" || dob == "") {
    return false;
  }
  return true;
}

function showEditModal(elm) {
  let stdIndex = +elm.getAttribute("student-index");
  document.getElementById("studentIndex").value = stdIndex;
}
window.addEventListener("load", addStudent);
