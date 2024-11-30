const BASE_API_URL =
  'https://lks5ix2fxrfihvyl3rdeyhwkci0vogjc.lambda-url.ap-south-1.on.aws/';

async function sendLoginData(username, password) {
  const url = `${BASE_API_URL}login?username=${username}&password=${password}`;

  const response = await fetch(url, {
    method: 'POST',
  });

  return response;
}

export { sendLoginData };
