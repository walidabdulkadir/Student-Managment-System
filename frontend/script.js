const API_URL = "http://localhost:7000";

const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const departmentInput = document.getElementById("department");
const addressInput = document.getElementById("address");
const genderInput = document.getElementById("gender");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const studentTable = document.getElementById("studentTable");
const tableCounter = document.getElementById("tableCounter");

let students = [];
let editMode = false;
let editId = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetch(`${API_URL}/createTable`);
  } catch (error) {
    console.error("Database connection or table initialization failed:", error);
  }
  
  fetchStudents();
});

async function fetchStudents() {
  try {
    const response = await fetch(`${API_URL}/students`);
    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }
    students = await response.json();
    renderTable();
  } catch (error) {
    console.error("Error fetching students:", error);
    studentTable.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-danger py-4">
          <i class="bi bi-exclamation-triangle-fill fs-4"></i><br>
          Error loading student records. Make sure the server and database are running.
        </td>
      </tr>
    `;
    tableCounter.innerText = "Error loading count";
  }
}

function getDeptClass(dept) {
  switch (dept) {
    case "Software Engineering":
      return "badge-se";
    case "Computer Science":
      return "badge-cs";
    case "Information Technology":
      return "badge-it";
    case "Information System":
      return "badge-is";
    default:
      return "badge bg-secondary text-white";
  }
}

function renderTable() {
  studentTable.innerHTML = "";

  if (students.length === 0) {
    studentTable.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted py-4">
          <i class="bi bi-people fs-3"></i><br>
          No students found. Add a student to get started!
        </td>
      </tr>
    `;
    tableCounter.innerText = "Showing 0 of 0 students";
    return;
  }

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="fw-semibold">${student.name}</td>
      <td>${student.email}</td>
      <td><span class="${getDeptClass(student.department)}">${student.department}</span></td>
      <td>${student.phone}</td>
      <td>
        <button class="editBtn" onclick="editStudent(${student.id})" title="Edit Student">
          <i class="bi bi-pencil-fill"></i>
        </button>
        <button class="deleteBtn" onclick="deleteStudent(${student.id})" title="Delete Student">
          <i class="bi bi-trash-fill"></i>
        </button>
      </td>
    `;
    studentTable.appendChild(row);
  });

  tableCounter.innerText = `Showing 1 to ${students.length} of ${students.length} students`;
}

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const department = departmentInput.value;
  const address = addressInput.value.trim();
  const gender = genderInput.value;

  const payload = { name, email, phone, department, address, gender };

  try {
    let url = `${API_URL}/register`;
    let method = "POST";

    if (editMode) {
      url = `${API_URL}/students/${editId}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errMsg = await response.text();
      throw new Error(errMsg || "Operation failed");
    }

    resetForm();
    fetchStudents();
  } catch (error) {
    console.error("Form submission failed:", error);
    alert(`Error: ${error.message}`);
  }
});

window.editStudent = function (id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;

  nameInput.value = student.name;
  emailInput.value = student.email;
  phoneInput.value = student.phone;
  departmentInput.value = student.department;
  addressInput.value = student.address;
  genderInput.value = student.gender;

  editMode = true;
  editId = id;

  submitBtn.innerHTML = `<i class="bi bi-floppy-fill"></i> Update Student`;
  
  nameInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.deleteStudent = async function (id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;

  if (confirm(`Are you sure you want to delete the student record for "${student.name}"?`)) {
    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete record");
      }

      if (editMode && editId === id) {
        resetForm();
      }

      fetchStudents();
    } catch (error) {
      console.error("Delete failed:", error);
      alert(`Error: ${error.message}`);
    }
  }
};

resetBtn.addEventListener("click", () => {
  resetForm();
});

function resetForm() {
  studentForm.reset();
  editMode = false;
  editId = null;
  submitBtn.innerHTML = `<i class="bi bi-floppy"></i> Save Student`;
}
