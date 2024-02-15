const axios = require('axios');

exports.name = '/twsearch';

exports.index = async (req, res, next) => {
  const key = req.query.key;
   if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
  if (!key) {
    return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
  }

  const options = {
    method: 'GET',
    url: 'https://twitter-api45.p.rapidapi.com/search.php',
    params: { query: key },
    headers: {
      'X-RapidAPI-Key': 'fd92cf57c9msh1f7b78b804353c7p1548f3jsn69db0304865d',
      'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      console.log(response.data);
      return res.json(response.data);
    } else {
      throw new Error('Có lỗi xảy ra khi tải dữ liệu từ API');
    }
  } catch (error) {
    console.error(error);
    return res.json({ error: 'Có lỗi xảy ra khi tải dữ liệu từ API' });
  }
};
