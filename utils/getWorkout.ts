export default async function getWorkout({
  focus,
  duration,
  level,
}: {
  focus: string;
  duration: string;
  level: string;
}) {
  const prompt = `
    Generate a structured JSON workout plan with exercises based on:
    - Focus: ${focus}
    - Level: ${level}
    - Duration: ${duration}
  
    Each exercise should include:
    - Name
    - Sets
    - Reps
    - Rest Time
    - Duration (seconds)
    - Estimated Calories Burned
    - Description
  
    Return JSON in this format:
    {
      "workout": [
        {
          "name": "Exercise Name",
          "sets": 4,
          "reps": "12-15",
          "rest_time": "30 sec",
          "duration_seconds": 45,
          "calories_burned": 12.5,
          "description": "Brief exercise description"
        }
      ]
    }
    `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'system', content: prompt }],
        temperature: 0.7,
      }),
    });
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error while generating workout! ', error);
    return null;
  }
}
