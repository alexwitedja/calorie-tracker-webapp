const exerciseMap = new Map();
exerciseMap.set('Light', 1.2);
exerciseMap.set('Moderate', 1.375);
exerciseMap.set('Active', 1.55);
exerciseMap.set('Very Active', 1.725);
exerciseMap.set('Extra Active', 1.9);

const mifflinCalculator = (weight, height, age, gender, exercise) => {
  let exerciseFactor = exerciseMap.get(exercise);
  if (gender === 'male') {
    return parseInt((10 * weight + 6.25 * height - 5 * age + 5) * exerciseFactor, 10);
  } else {
    return parseInt((10 * weight + 6.25 * height - 5 * age - 161) * exerciseFactor, 10);
  }
};

module.exports = mifflinCalculator