import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';



export const fetchUser = (history) => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, history) => async dispatch => {
  // const uploadConfig = await axios.get('/api/upload');

  // const upload = await axios.put(uploadConfig.data.url, file, {
  //   headers: {
  //     'Content-Type': file.type
  //   }
  // });
  // console.log(uploadConfig)

  const res = await axios.post('/api/totps', {
    
    ...values,
    imageUrl: "knwonfowenfhoeiwhfohwefh",
    content:"827327273"
  });
 
  history.push('/secure/sempeak/otpcodes');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/totps');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/totps/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
