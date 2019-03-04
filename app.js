
// Exercise Class: Represent a Exercise
class Workout {
   constructor(exercise, weight, repetition, sets) {
      this.exercise = exercise;
      this.weight = weight;
      this.repetition = repetition;
      this.sets = sets;
   }
}


// UI Class: Handle UI Task
class UI {
   static displayWorkout() {
   

      const workouts = Store.getWorkouts();

      workouts.forEach((workout) => UI.addWorkoutToList(workout));
   }

   static addWorkoutToList(workout) {
      const list = document.querySelector("#workout-list");

      const row = document.createElement("tr");

      row.innerHTML = `
         <td>${workout.exercise}</td>
         <td>${workout.weight}</td>
         <td>${workout.repetition}</td>
         <td>${workout.sets}</td>
         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

      list.appendChild(row);
   }

   static deleteWorkout(el) {
      if(el.classList.contains("delete")) {
         el.parentElement.parentElement.remove();
      }
   }

   static showAlert(message, className) {

      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('#workout-form');

      // Varför funkar detta.......
      const form = document.querySelector('#DennaIdExisterarInte');
      container.insertBefore(div, form);

      // Timeout
      setTimeout(() => document.querySelector(".alert").remove(), 2000);
   }

   static clearFields() {
      document.querySelector("#exercise").value = "";
      document.querySelector("#weight").value = "";
      document.querySelector("#reps").value = "";
      document.querySelector("#sets").value = "";
   }
}


// Store Class: Handles Storage
class Store {
   static getWorkouts() {
      let workouts;
      if(localStorage.getItem("workouts") === null) {
         workouts = [];
      } else {
         workouts = JSON.parse(localStorage.getItem("workouts"));
      }

      return workouts;
   }

   static addWorkout(workout) {
      const workouts = Store.getWorkouts();

      workouts.push(workout);

      localStorage.setItem("workouts", JSON.stringify(workouts));

   }

   static removeWorkout(sets) { 
      const workouts = Store.getWorkouts();

      workouts.forEach((workout, index) => {
         if(workout.sets === sets) {
            workouts.splice(index, 1);
         }
      });

      localStorage.setItem("workouts", JSON.stringify(workouts));

   }
}

// Event: Display Exercises

document.addEventListener("DOMContentLoaded", UI.displayWorkout);

// Event: Add a Workout
document.querySelector("#workout-form").addEventListener("submit", (e) => {

   // Prevent actual submit
   e.preventDefault();

   // Get Form values
   const exercise = document.querySelector("#exercise").value;
   const weight = document.querySelector("#weight").value;
   const repetition = document.querySelector("#reps").value;
   const sets = document.querySelector("#sets").value;


   // Instatiate workout
   const workout = new Workout(exercise, weight, repetition, sets);

   // Add Workout to UI
   UI.addWorkoutToList(workout);

   // Add workout to store
   Store.addWorkout(workout);

   //  Show success message
   UI.showAlert("Exercise Added", "success");

   // Clear fields
   UI.clearFields();
   
});

// Event: Remove a Workout
document.querySelector("#workout-list").addEventListener("click", (e) => {
   // Remove workout from UI
   UI.deleteWorkout(e.target)

   UI.showAlert("Exercise Removed", "danger");

   // Remove workout from store
   Store.removeWorkout(e.target.parentElement.previousElementSibling.textContent);

   // Show workout removed
   
});