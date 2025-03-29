// Sidebar active state handling
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
  const li = item.parentElement;
  item.addEventListener('click', function () {
    allSideMenu.forEach(i => {
      i.parentElement.classList.remove('active');
    });
    li.classList.add('active');
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
  sidebar.classList.toggle('hide');
});

// Optional global function for inline onclick usage
function toggleSidebar() {
  sidebar.classList.toggle('hide');
}

// SEARCH FORM TOGGLE FOR SMALL SCREENS
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle('show');
    if (searchForm.classList.contains('show')) {
      searchButtonIcon.classList.replace('bx-search', 'bx-x');
    } else {
      searchButtonIcon.classList.replace('bx-x', 'bx-search');
    }
  }
});

// INITIAL STATE BASED ON WINDOW WIDTH
if (window.innerWidth < 768) {
  sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace('bx-x', 'bx-search');
  searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
  }
});

// DARK MODE SWITCH
const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});

// OPTIONAL: To-Do Toggle Functionality
function toggleTodo(checkbox) {
  checkbox.parentElement.classList.toggle('completed');
}

// Chart.js Initialization and Dynamic Chart Update
document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('salesChart').getContext('2d');

  // Create the chart with default data
  const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [{
        label: 'Sales',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Sales Trend',
        },
      },
    },
  });

  // Handle form submission for updating the chart dynamically
  const chartForm = document.getElementById('chartForm');
  chartForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const dataInput = document.getElementById('monthData').value;
    const dataArray = dataInput.split(',').map(item => parseFloat(item.trim()));

    // Validate that four numeric values are given
    if (dataArray.length !== 4 || dataArray.some(isNaN)) {
      alert("Please enter four numeric values separated by commas (e.g., 12, 19, 3, 5)");
      return;
    }
    
    // Update the chart's dataset with the new data and refresh the chart
    salesChart.data.datasets[0].data = dataArray;
    salesChart.update();
  });
});
