function sortTable(n) {
  var table, rows, switching, i, x, y, a, b, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("menu-table");
  switching = true;
  dir = "asc";
 
  while (switching) {
    switching = false;
    rows = table.rows;
 
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
 
      a = x.innerHTML.toLowerCase().trim();
      b = y.innerHTML.toLowerCase().trim();
 
      if (n === 3) {
        a = parseFloat(a.replace("$", ""));
        b = parseFloat(b.replace("$", ""));
      }
 
      if (dir == "asc") {
        if (a > b) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (a < b) {
          shouldSwitch = true;
          break;
        }
      }
    }
 
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
 
function exportPdf() {
  $("#menu-table").tableHTMLExport({
    type: "pdf",
    filename: "menu.pdf",
    ignoreColumns: ".no-export"
  });
}
 
function filterMenu() {
  var query = document.getElementById("searchInput").value.toLowerCase().trim();
  var rows = document.querySelectorAll("#menu-table tbody tr");
 
  rows.forEach(function (row) {
    var text = (
      row.cells[0].textContent + " " +
      row.cells[1].textContent + " " +
      row.cells[2].textContent
    ).toLowerCase();
 
    row.style.display = text.indexOf(query) === -1 ? "none" : "";
  });
}
 
document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
  filterMenu();
});
 
document.getElementById("searchInput").addEventListener("input", filterMenu);
 
