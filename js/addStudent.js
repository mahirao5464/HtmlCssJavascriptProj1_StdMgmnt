const addStudent = function () {
  // event listener

  // Getting save btn ref in js
  const saveButtonRef = document.getElementById("save-btn");

  // adding click event handler to save button
  saveButtonRef.addEventListener("click", saveButtonClickHandler);

  // save button click handler
  function saveButtonClickHandler(event) {
    let isStudentValid = isStudentFormValid();
    if (!isStudentValid) {
      var alertElmRef = document.querySelector("div.alert-class");
      alertElmRef.style.display = "block";
      return;
    }
    console.log("Registering student please wait......");
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
};

window.addEventListener("load", addStudent);
