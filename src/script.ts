interface CalorieCalculatorInputs {
    gender: 'male' | 'female';
    age: number;
    weight: number;
    height: number;
    activity: number;
}

class CalorieCalculator {
    private form: HTMLFormElement;
    private resultDiv: HTMLElement;
    private caloricNeedsElement: HTMLElement;

    constructor() {
        this.form = document.getElementById('caloric-form') as HTMLFormElement;
        this.resultDiv = document.getElementById('result') as HTMLElement;
        this.caloricNeedsElement = document.getElementById('caloric-needs') as HTMLElement;

        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();
        
        const inputs = this.getInputs();
        const caloricNeeds = this.calculateCaloricNeeds(inputs);

        this.displayResult(caloricNeeds);
    }

    private getInputs(): CalorieCalculatorInputs {
        return {
            gender: (document.getElementById('gender') as HTMLSelectElement).value as 'male' | 'female',
            age: parseInt((document.getElementById('age') as HTMLInputElement).value),
            weight: parseFloat((document.getElementById('weight') as HTMLInputElement).value),
            height: parseFloat((document.getElementById('height') as HTMLInputElement).value),
            activity: parseFloat((document.getElementById('activity') as HTMLSelectElement).value)
        };
    }

    private calculateCaloricNeeds(inputs: CalorieCalculatorInputs): number {
        const { gender, age, weight, height, activity } = inputs;

        // Calculate BMI
        const bmi = weight / ((height / 100) ** 2);

        // Calculate Ideal Body Weight (IBW) using Hamwi formula
        const ibw = gender === 'male'
            ? 48 + 2.7 * ((height / 2.54) - 60)
            : 45.5 + 2.2 * ((height / 2.54) - 60);

        let bmr: number;
        if (bmi > 40) { // Morbidly obese
            // Use Mifflin-St Jeor with adjusted weight
            const adjustedWeight = ibw + 0.25 * (weight - ibw);
            bmr = 10 * adjustedWeight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
        } else {
            // Use standard Mifflin-St Jeor
            bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
        }

        return Math.round(bmr * activity);
    }

    private displayResult(caloricNeeds: number): void {
        this.caloricNeedsElement.textContent = `${caloricNeeds} calories per day`;
        this.resultDiv.classList.remove('hidden');
    }
}

// Initialize the calculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalorieCalculator();
});