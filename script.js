async function getWeather() {
  const location = document.getElementById('locationInput').value;
  const resultDiv = document.getElementById('result');

  if (!location) {
    resultDiv.innerHTML = '<p>Please enter a location.</p>';
    return;
  }

  resultDiv.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=becaac24ddef4fa8a7c84717252006&q=${location}&aqi=yes`
    );

    if (!response.ok) throw new Error('Location not found');

    const data = await response.json();
    resultDiv.innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="${data.current.condition.text}" />
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
