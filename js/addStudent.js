var students = [];
var editModal;

function addStudent() {
  editModal = new bootstrap.Modal(document.getElementById("editModal"), {
    backdrop: "static",
  });
  // Getting save btn ref in js
  const saveButtonRef = document.getElementById("save-btn");
  // adding click event handler to save button
  saveButtonRef.addEventListener("click", saveButtonClickHandler);

  const updateButtonRef = document.getElementById("update-btn");
  updateButtonRef.addEventListener("click", updateStudent);
  // fetching data from endpoint
  fetch("https://crudcrud.com/api/e4e4cfae69e7472d9b86823b26555c6d/Students")
    .then((el) => el.json()) // converting result to json
    .then(apiResult); // calling apiresult function once response converted to json

  // adds data to table
  function apiResult(result) {
    console.log(result);
    students = students.concat(result);
    students.forEach((el) => {
      //el.rollNumber = el._id;
      renderTable(el);
    });
  }
}

async function updateStudent() {
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

  const studentId = document.getElementById("studentIndex").value;

  const isUpdated = await updateStudentData(studentId, {
    fullName,
    fatherName,
    motherName,
    dob,
  });

  if (isUpdated) {
    //const updatedRowElemRef = document.getElementById("row-" + studentId);
    document.getElementById("fullName-" + studentId).innerHTML = fullName;
    document.getElementById("fatherName-" + studentId).innerHTML = fatherName;
    document.getElementById("motherName-" + studentId).innerHTML = motherName;
    document.getElementById("dob-" + studentId).innerHTML = dob;
    const arrIndex = students.findIndex((el) => el._id === studentId);
    students[arrIndex].fullName = fullName;
    students[arrIndex].fatherName = fatherName;
    students[arrIndex].motherName = motherName;
    students[arrIndex].dob = dob;
    editModal.hide();
  } else {
    alert("Unable to update the student");
  }
}
// save button click handler
async function saveButtonClickHandler(event) {
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

  const newStudent = await postStudent({
    fullName: fullName,
    fatherName: fatherName,
    motherName: motherName,
    dob: dob,
  });
  // var newStudent = {
  //   fullName: fullName,
  //   fatherName: fatherName,
  //   motherName: motherName,
  //   dob: dob,
  // };
  students.push(newStudent);
  renderTable(newStudent);
}
function renderTable(el) {
  const tableBodyElmRef = document.getElementById("studentTableBody");

  let rowTemplate = `<tr id='row-${el._id}'>
              <th scope="row">${el._id}</th>
              <td id='fullName-${el._id}'>${el.fullName}</td>
              <td id='fatherName-${el._id}'>${el.fatherName}</td>
              <td id='motherName-${el._id}'>${el.motherName}</td>
              <td id='dob-${el._id}'>${el.dob}</td>
              <td>
                <button type="button" class="btn btn-primary btn-sm"  data-bs-toggle="modal" id="editStudent${el._id}" onclick="showEditModal(this)" student-index = "${el._id}">Edit</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteStudent('${el._id}')">Delete</button>
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
async function deleteStudent(studentId) {
  console.log(studentId);

  const isConfirmed = confirm("Are you sure you want to delete?");

  if (isConfirmed) {
    fetch(
      "https://crudcrud.com/api/e4e4cfae69e7472d9b86823b26555c6d/Students/" +
        studentId,
      {
        method: "DELETE",
      }
    )
      .then((el) => {
        document.getElementById("row-" + studentId).remove();
      })
      .catch((er) => {
        alert("Enable to delete the student. See console for more information");
        console.log(er);
      });
  }
}
function showEditModal(elm) {
  let stdIndex = elm.getAttribute("student-index");
  document.getElementById("studentIndex").value = stdIndex;
  let selectedStudent = students.find((el) => el._id == stdIndex);
  document.getElementById("editFullName").value = selectedStudent.fullName;
  document.getElementById("editFatherName").value = selectedStudent.fatherName;
  document.getElementById("editMotherName").value = selectedStudent.motherName;
  document.getElementById("editDob").value = selectedStudent.dob;
  editModal.show();
}

async function postStudent(student) {
  const response = await fetch(
    "https://crudcrud.com/api/e4e4cfae69e7472d9b86823b26555c6d/Students",
    {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"],
        ["Content-Type", "text/plain"],
      ],
      body: JSON.stringify(student),
    }
  );

  const addedStudent = await response.json();
  console.log(addedStudent);

  return addedStudent;
}

async function updateStudentData(studentId, student) {
  const response = await fetch(
    "https://crudcrud.com/api/e4e4cfae69e7472d9b86823b26555c6d/Students/" +
      studentId,

    {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(student),
    }
  );

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
window.addEventListener("load", addStudent);
