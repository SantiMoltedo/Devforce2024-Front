export const sortTable = (n, dir, button) => {
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    switchcount = 0;
  if (document.querySelector("[selected]"))
    document.querySelector("[selected]").removeAttribute("selected");
  button.parentElement.setAttribute("selected", "");
  console.log(dir);
  table = document.getElementById("user-trainings-table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    }
  }
};
