const form = document.getElementById('data-strategy-form');
const generateButton = document.getElementById('generate-button');
const responseContainer = document.getElementById('response-container');

generateButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const projectName = document.getElementById('project-name').value;
  const projectArea = document.getElementById('project-area').value;
  const primaryGoal = document.getElementById('primary-goal').value;
  const metrics = document.getElementById('metrics').value;

  const prompt = `Generate a concise data strategy for ${projectName} to improve ${projectArea} by achieving ${primaryGoal} with data. The goal is to ${metrics}. Provide a brief summary and recommended plan, including data collection, analytics, and KPIs, to help ${projectName} achieve its objectives. Limit the response to 500 words.`;
  const bodyPrompt={
    "model": "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
    "messages": [
      {"role": "user", "content": prompt}
    ]
  };

  try {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer bca09e7e465d15f6379def615ff70efd2cfc2110b43b17f1dc327e552ba67f75'
      },
      body: JSON.stringify(bodyPrompt)
    });

    const data = await response.json();
    const responseText = data.choices[0].message.content;

    responseContainer.innerHTML = `
      <h2>Data Strategy:</h2>
      <p>${responseText}</p>
    `;
  } catch (error) {
    console.error(error);
    responseContainer.innerHTML = `
      <h2>Error:</h2>
      <p>${error.message}</p>
    `;
  }
});
