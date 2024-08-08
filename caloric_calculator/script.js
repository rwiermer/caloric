document.getElementById('caloric-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);

    // Calculate BMI
    const bmi = weight / ((height / 100) ** 2);

    // Calculate Ideal Body Weight (IBW) using Hamwi formula
    let ibw;
    if (gender === 'male') {
        ibw = 48 + 2.7 * ((height / 2.54) - 60);
    } else {
        ibw = 45.5 + 2.2 * ((height / 2.54) - 60);
    }

    let bmr;
    // if (bmi > 40) { // Morbidly obese
        // Use Mifflin-St Jeor with adjusted weight
        const adjustedWeight = ibw + 0.25 * (weight - ibw);
        bmr = 10 * adjustedWeight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
    // } else {
        // Use standard Mifflin-St Jeor
    //    bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
    //}

    const caloricNeeds = Math.round(bmr * activity);

    let resultText = `Your estimated caloric needs: ${caloricNeeds} calories per day<br>`;
    resultText += `Your BMI: ${bmi.toFixed(1)}<br>`;
    if (bmi > 40) {
        resultText += "Note: Due to high BMI, an adjusted calculation method was used for more accurate results.";
    }

    document.getElementById('caloric-needs').innerHTML = resultText;
    document.getElementById('result').classList.remove('hidden');
});