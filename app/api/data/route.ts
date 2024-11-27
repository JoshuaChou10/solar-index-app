import { createReadStream } from 'fs';
import path from 'path';
import csv from 'csv-parser';

export async function GET(request) {
  const url = new URL(request.url);
  const index = url.searchParams.get('index');

  const filePath = path.join(process.cwd(), 'data', 'data.csv');

  // Function to read and parse the CSV file
  const readCSV = () => {
    return new Promise((resolve, reject) => {
      const results = [];
      createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  };

  try {
    const data = await readCSV();

    if (index === null) {
      const solar1 = data.map((row) => ({
          lat: parseFloat(row.y),
          lon: parseFloat(row.x),
          value: parseFloat(row.i),
        }))     
        return new Response(JSON.stringify({ solar1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const parsedIndex = parseInt(index, 10);

    if (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex >= data.length) {
      return new Response(
        JSON.stringify({ error: 'Invalid index' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return the specific `i` value
    return new Response(
      JSON.stringify({ i: parseInt(data[parsedIndex].i, 10) }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to read CSV file' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
