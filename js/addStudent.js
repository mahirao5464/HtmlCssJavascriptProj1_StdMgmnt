var srNo = 0;
var students = [];
function addStudent() {
  // Getting save btn ref in js
  const saveButtonRef = document.getElementById("save-btn");
  // adding click event handler to save button
  saveButtonRef.addEventListener("click", saveButtonClickHandler);

  const updateButtonRef = document.getElementById("update-btn");
  updateButtonRef.addEventListener("click", updateStudent);
  // fetching data from endpoint
  fetch("https://crudcrud.com/api/9114ffd40eb3483baec13139f7619556/Students")
    .then((el) => el.json()) // converting result to json
    .then(apiResult); // calling apiresult function once response converted to json

  // adds data to table
  function apiResult(result) {
    console.log(result);
    students = students.concat(result);
    students.forEach((el) => {
      el.rollNumber = el._id;
      renderTable(el);
    });
  }
}

function updateStudent() {
  const fullName = document.getElementById("editFullName").value;
  const fatherName = document.getElementById("editFatherName").value;
  const motherName = document.getElementById("editMotherName").value;
  const dob = document.getElementById("editDob").value;
  let isStudentValid = isStudentFormValid({
    fullName,
    fatherName,
    motherName,
    dob,
  });

  if (!isStudentValid) {
    var alertElmRef = document.querySelector("div.alert-class");
    alertElmRef.style.display = "block";
    return;
  }
}
// save button click handler
function saveButtonClickHandler(event) {
  const fullName = document.getElementById("fullName").value;
  const fatherName = document.getElementById("fatherName").value;
  const motherName = document.getElementById("motherName").value;
  const dob = document.getElementById("dob").value;

  let isStudentValid = isStudentFormValid({
    fullName,
    fatherName,
    motherName,
    dob,
  });
  if (!isStudentValid) {
    var alertElmRef = document.querySelector("div.alert-class");
    alertElmRef.style.display = "block";
    return;
  }

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
  document.querySelector("form#saveStdForm").reset();
}

function isStudentFormValid(student) {
  if (
    student.fullName == "" ||
    student.fatherName == "" ||
    student.motherName == "" ||
    student.dob == ""
  ) {
    return false;
  }
  return true;
}

function showEditModal(elm) {
  let stdIndex = +elm.getAttribute("student-index");
  document.getElementById("studentIndex").value = stdIndex;
  let selectedStudent = students.find((el) => el.rollNumber == stdIndex);
  document.getElementById("editFullName").value = selectedStudent.fullName;
  document.getElementById("editFatherName").value = selectedStudent.fatherName;
  document.getElementById("editMotherName").value = selectedStudent.motherName;
  document.getElementById("editDob").value = selectedStudent.dob;
}
window.addEventListener("load", addStudent);
