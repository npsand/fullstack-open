import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const add = async(blogObject, newToken) => {
  setToken(newToken)
  console.log(token)
  const res = await axios.post(baseUrl, blogObject, { headers: { Authorization: token } })
  return res.data
}

const update = async (id, blogObject) => {
  console.log(`${baseUrl}/${id}`)
  const res = await axios.put(`${baseUrl}/${id}`, blogObject)
  console.log(res)
  return res.data
}

const remove = async (id, newToken) => {
  setToken(newToken)
  const res = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
  return res.data
}


export default { getAll, update, setToken, add, remove }