import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '38024534-bf97a1c6c6875f539670f21a6';

export async function fetchPictures( searchQuery, page, per_page) {
    const url = `${URL}?key=${KEY}`;
  
    try {
      const paramsSearch = {
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page,
        q: searchQuery,
      };
  
      const response = await axios.get(url, {
        params: paramsSearch,
      });
  
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

