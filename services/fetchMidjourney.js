/* import fetch from 'node-fetch';

const useMidjourney = async () => {
  const url = 'https://ai_image-database.p.rapidapi.com/images/midjourney';
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '991c511ab0msh8758e4b8b60f38dp183e5ejsnb33d53be312b',
      'X-RapidAPI-Host': 'ai_image-database.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    let result = await response.text();
    result = JSON.parse(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export { useMidjourney };
 */
