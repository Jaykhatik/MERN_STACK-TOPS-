// Handle booking form
const form = document.getElementById("bookingForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const date = document.getElementById("date").value.trim();
    const concern = document.getElementById("concern").value.trim();

    let valid = true;

    // Reset errors
    document.querySelectorAll(".text-danger").forEach(el => el.textContent = "");

    // Validation
    if (!name) { document.getElementById("nameError").textContent = "Name is required"; valid = false; }
    if (!/^\d{10}$/.test(phone)) { document.getElementById("phoneError").textContent = "Phone must be 10 digits"; valid = false; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { document.getElementById("emailError").textContent = "Invalid email"; valid = false; }
    if (!(age >= 1 && age <= 120)) { document.getElementById("ageError").textContent = "Age must be 1-120"; valid = false; }
    if (!date) { document.getElementById("dateError").textContent = "Date is required"; valid = false; }
    if (!concern) { document.getElementById("concernError").textContent = "Concern is required"; valid = false; }

    if (!valid) return;

    // Save booking
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push({ name, phone, email, age, date, concern });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Show success
    document.getElementById("successMsg").classList.remove("d-none");
    form.reset();
  });
}

// Handle viewing bookings
const bookingContainer = document.getElementById("bookingContainer");
if (bookingContainer) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    bookingContainer.innerHTML = `<p class="text-center text-muted">No bookings available</p>`;
  } else {
    let table = `
      <table class="table table-bordered table-hover text-center">
        <thead class="table-dark">
          <tr>
            <th>Name</th><th>Phone</th><th>Email</th><th>Age</th><th>Date</th><th>Concern</th>
          </tr>
        </thead>
        <tbody>
          ${bookings.map(b => `
            <tr>
              <td>${b.name}</td>
              <td>${b.phone}</td>
              <td>${b.email}</td>
              <td>${b.age}</td>
              <td>${b.date}</td>
              <td>${b.concern}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>`;
    bookingContainer.innerHTML = table;
  }
}
