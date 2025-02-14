import { WorkoutResponse } from '../types/types';

export default async function getWorkout(
  focus: string,
  level: string,
  duration: string
): Promise<WorkoutResponse | null> {
  const prompt = `
    Generate 3 structured JSON workout plans with different exercises based on:
    - Focus: ${focus}
    - Level: ${level}
    - Duration: ${duration}
  
    Each workout should include:
    - Name
    - Sets
    - Reps
    - Rest Time
    - Duration (seconds)
    - Estimated Calories Burned
    - Description
    - Muscle Groups Targeted

    Return JSON in this format:
    {
      "workouts": [
        {
          "name": "Workout Plan 1",
          "exercises": [
            {
              "name": "Exercise Name",
              "sets": 4,
              "reps": "12-15",
              "rest_time": "30 sec",
              "duration_seconds": 45,
              "calories_burned": 12.5,
              "description": "Brief exercise description",
              "muscle_groups": ["Chest", "Triceps"]
            }
          ]
        }
      ]
    }
    `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful fitness AI assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('Error: Invalid response format', data);
      return null;
    }

    return JSON.parse(data.choices[0].message.content) as WorkoutResponse;
  } catch (error) {
    console.error('Error while generating workout:', error);
    return null;
  }
}
