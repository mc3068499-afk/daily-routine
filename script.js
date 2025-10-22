document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("calendar-container");
  const title = document.getElementById("month-title");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const monthName = today.toLocaleString('default', { month: 'long' });

  title.textContent = `${monthName} ${year} - Monthly Routine Tracker`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Workout</th>
          <th>NOBA</th>
          <th>Spanish Duolingo<br><span class="shift-note">(Morning)</span></th>
          <th>Editing<br><span class="shift-note">(Evening)</span></th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    tableHTML += `
      <tr>
        <td>${dateStr}</td>
        <td><input type="checkbox" data-task="${dateStr}-workout"></td>
        <td><input type="checkbox" data-task="${dateStr}-noba"></td>
        <td><input type="checkbox" data-task="${dateStr}-spanish"></td>
        <td><input type="checkbox" data-task="${dateStr}-editing"></td>
      </tr>
    `;
  }

  tableHTML += `</tbody></table>`;
  container.innerHTML = tableHTML;

  // Restore saved checkbox states
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(checkbox => {
    const taskKey = checkbox.dataset.task;
    const saved = localStorage.getItem(taskKey);

    if (saved === "true") {
      checkbox.checked = true;
      checkbox.parentElement.classList.add("done");
    }

    checkbox.addEventListener("change", () => {
      localStorage.setItem(taskKey, checkbox.checked);
      checkbox.parentElement.classList.toggle("done", checkbox.checked);
    });
  });
});
