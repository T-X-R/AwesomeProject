import axios from 'react-native-axios'

export default function FetchData (url, data = {}, type = 'GET') {

  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET')
      promise = axios.get(url, { params: data })
    else
      promise = axios.post(url, data)
    promise.then(res => {
      resolve(res.data)
    }).catch(error => {
      console.warn(error)
    })
  })

}