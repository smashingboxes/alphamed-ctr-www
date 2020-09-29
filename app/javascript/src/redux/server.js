import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://alphamed-rewrite-staging.herokuapp.com'
      : 'https://alphamed-rewrite-staging.herokuapp.com'
});
