import axios from 'axios';

const API_KEY = '42782608-9283e0435a58714aa19763cda';
const BASE_URL = 'https://pixabay.com/api/';

export function getPhotos(q, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 20,
  });
  const url = `${BASE_URL}/?${params}`;

  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
