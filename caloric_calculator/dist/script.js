"use strict";
class CalorieCalculator {
    constructor() {
        this.form = document.getElementById('caloric-form');
        this.resultDiv = document.getElementById('result');
        this.caloricNeedsElement = document.getElementById('caloric-needs');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
    handleSubmit(e) {
        e.preventDefault();
        const inputs = this.getInputs();
        const caloricNeeds = this.calculateCaloricNeeds(inputs);
        this.displayResult(caloricNeeds);
    }
    getInputs() {
        return {
            gender: document.getElementById('gender').value,
            age: parseInt(document.getElementById('age').value),
            weight: parseFloat(document.getElementById('weight').value),
            height: parseFloat(document.getElementById('height').value),
            activity: parseFloat(document.getElementById('activity').value)
        };
    }
    calculateCaloricNeeds(inputs) {
        const { gender, age, weight, height, activity } = inputs;
        // Calculate BMI
        const bmi = weight / (Math.pow((height / 100), 2));
        // Calculate Ideal Body Weight (IBW) using Hamwi formula
        const ibw = gender === 'male'
            ? 48 + 2.7 * ((height / 2.54) - 60)
            : 45.5 + 2.2 * ((height / 2.54) - 60);
        let bmr;
        if (bmi > 40) { // Morbidly obese
            // Use Mifflin-St Jeor with adjusted weight
            const adjustedWeight = ibw + 0.25 * (weight - ibw);
            bmr = 10 * adjustedWeight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
        }
        else {
            // Use standard Mifflin-St Jeor
            bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
        }
        return Math.round(bmr * activity);
    }
    displayResult(caloricNeeds) {
        this.caloricNeedsElement.textContent = `${caloricNeeds} calories per day`;
        this.resultDiv.classList.remove('hidden');
    }
}
// Initialize the calculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalorieCalculator();
});
