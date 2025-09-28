// CustomerFormHandler Class
class CustomerFormHandler {
  constructor(formId, messageBoxId) {
    this.form = document.getElementById(formId);
    this.messageBox = document.getElementById(messageBoxId);
    if (this.form) this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.form.addEventListener("reset", () => this.clearForm());
    this.form.addEventListener("input", (e) => this.validateField(e.target));
  }

  validateField(field) {
    let valid = true;
    const val = field.value.trim();
    switch (field.id) {
      case "name": valid = val.length >= 3; break;
      case "phone": valid = /^\d{10}$/.test(val); break;
      case "email": valid = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(val); break;
      case "vehicle": valid = val !== ""; break;
      case "complaint": valid = val.length >= 10; break;
    }
    field.style.borderColor = valid ? "green" : "red";
    return valid;
  }

  validateForm() {
    let fields = ["name", "phone", "email", "vehicle", "complaint"];
    return fields.every(id => this.validateField(document.getElementById(id)));
  }

  saveToLocalStorage(data) {
    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push(data);
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }

  clearForm() {
    this.form.reset();
    [...this.form.elements].forEach(el => el.style.borderColor = "#ccc");
  }

  showMessage(type, text) {
    this.messageBox.className =` message-box ${type}`;
    this.messageBox.textContent = text;
    this.messageBox.style.display = "block";
    setTimeout(() => this.messageBox.style.display = "none", 3000);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateForm()) {
      this.showMessage("error", "Please fix errors before submitting.");
      return;
    }
    const data = {
      name: this.form.name.value,
      phone: this.form.phone.value,
      email: this.form.email.value,
      vehicle: this.form.vehicle.value,
      complaint: this.form.complaint.value,
    };
    this.saveToLocalStorage(data);
    this.showMessage("success", "Form submitted successfully!");
    this.clearForm();
  }
}

// SubmissionViewer Class
class SubmissionViewer {
  constructor(tableBodyId, searchInputId, noDataId) {
    this.tableBody = document.getElementById(tableBodyId);
    this.searchInput = document.getElementById(searchInputId);
    this.noData = document.getElementById(noDataId);
    if (this.tableBody) this.init();
  }

  init() {
    this.renderTable();
    this.searchInput.addEventListener("input", () => this.renderTable());
  }

  getSubmissions() {
    return JSON.parse(localStorage.getItem("submissions")) || [];
  }

  deleteSubmission(index) {
    const password = prompt("Enter admin password to delete this record:");
    if (password !== "admin123") {  // change "admin123" if needed
      alert("Authentication failed! Record not deleted.");
      return;
    }
    let submissions = this.getSubmissions();
    submissions.splice(index, 1);
    localStorage.setItem("submissions", JSON.stringify(submissions));
    this.renderTable();
    alert("Record deleted successfully!");
  }

  renderTable() {
    let submissions = this.getSubmissions();
    const query = this.searchInput.value.toLowerCase();
    let filtered = submissions.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.vehicle.toLowerCase().includes(query)
    );

    this.tableBody.innerHTML = "";
    if (filtered.length === 0) {
      this.noData.style.display = "block";
      return;
    }
    this.noData.style.display = "none";

    filtered.forEach((s, i) => {
      let row = `<tr>
        <td>${s.name}</td>
        <td>${s.phone}</td>
        <td>${s.email}</td>
        <td>${s.vehicle}</td>
        <td>${s.complaint}</td>
        <td><button onclick="viewer.deleteSubmission(${i})" class="btn secondary">Delete</button></td>
      </tr>`;
      this.tableBody.innerHTML += row;
    });
  }
}

// Initialize depending on page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("customerForm")) {
    new CustomerFormHandler("customerForm", "messageBox");
  }
  if (document.getElementById("tableBody")) {
    window.viewer = new SubmissionViewer("tableBody", "searchInput", "noData");
  }
});