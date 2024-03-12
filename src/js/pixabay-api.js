import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '42782608-9283e0435a58714aa19763cda';

export async function getPhotos(q, page, perPage) {
  const { data } = await axios.get('', {
    params: {
      key: API_KEY,
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
  return data;
}
