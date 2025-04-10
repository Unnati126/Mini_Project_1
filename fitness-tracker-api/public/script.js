// Function to create a new fitness record
function createFitnessRecord() {
    const date = document.getElementById('date').value;
    const exercise = document.getElementById('exercise').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories').value;

    const newRecord = {
        date,
        exercise,
        duration,
        calories
    };

    fetch('http://localhost:5002/api/fitness', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Record created:', data);
        alert('Record created successfully!');
        displayFitnessRecords();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add record. Check the console for details.');
    });
}

// Function to display all fitness records
function displayFitnessRecords() {
    fetch('http://localhost:5002/api/fitness')
        .then(response => response.json())
        .then(records => {
            const recordsList = document.getElementById('records-list');
            recordsList.innerHTML = ''; // Clear previous records
            records.forEach(record => {
                const recordItem = document.createElement('li');
                recordItem.textContent = `Date: ${record.date}, Exercise: ${record.exercise}, Duration: ${record.duration} mins, Calories: ${record.calories} kcal`;
                recordsList.appendChild(recordItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Function to update a fitness record
function updateFitnessRecord(id) {
    const date = document.getElementById('date').value;
    const exercise = document.getElementById('exercise').value;
    const duration = document.getElementById('duration').value;
    const calories = document.getElementById('calories').value;

    const updatedRecord = {
        date,
        exercise,
        duration,
        calories
    };

    fetch(`http://localhost:5002/api/fitness/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Record updated:', data);
        alert('Record updated successfully!');
        displayFitnessRecords();
    })
    .catch(error => console.error('Error:', error));
}

// Function to delete a fitness record
function deleteFitnessRecord(id) {
    fetch(`http://localhost:5002/api/fitness/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        console.log('Record deleted');
        alert('Record deleted successfully!');
        displayFitnessRecords();
    })
    .catch(error => console.error('Error:', error));
}

// Initial call to display records
document.addEventListener('DOMContentLoaded', displayFitnessRecords);
