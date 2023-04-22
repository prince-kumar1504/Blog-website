import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000'

const axiosInstace = axios.create({
 baseURL : API_URL,
 timeout: 10000,
 headers:{
    "Content-Type": "application/json"
 }
})

axiosInstace.interceptors.request.use(
   function(config){
      return(config);
   },
   function(error){
      return Promise.reject(error);
   }
)

axiosInstace.interceptors.response.use(
   function(response){
      // i can stop any global loader
      return ProcessResponse(response); 
   },
   function(error){
      return Promise.reject(processError(error));
   }
)

/////////////////
// if success -> return {isSuccess :true, data:object }
// if fail -> return {isFailure : true, status: String, msg : String , code:int}

const ProcessResponse = (response)=>{
   if (response?.status === 200){
      return {isSuccess :true, data : response.data }
   }
   else{
      return {
         isFailure: true,
         status: response?.status,
         msg: response?.msg,
         code: response?.code
      }
   }
}
// if success -> return {isSuccess :true, data:object }
// if fail -> return {isFailure : true, status: String, msg : String , code:int}


const processError = (error)=>{
   if(error.response){
        // Request made and server responded with a diff status code
        // that fails out of the range of 2XX
        console.log('ERROR IN RESPONSE', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
   }
   else if (error.response) {
        // Resquest made but no response was recieved
        console.log('ERROR IN REQUEST', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }

   }else{
      // its our mistake , something happend in setting up debug that triggers error
      console.log('ERROR IN NETWORK', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkFailure,
            code: ""
        }

   }
}


const API = {};

for (const [key,value] of Object.entries(SERVICE_URLS)){
   API[key] = (body, showUploadProgress, showDownloadProgress) =>
      axiosInstace({
         method: value.method,
         url: value.url,
         data: body,
         responseType: value.responseType,
         onUploadProgress: function (progressEvent){
            if(showUploadProgress){
               let percentageCompleted = Math.round((progressEvent.loaded* 100)/ progressEvent.total)
               showUploadProgress(percentageCompleted);
            }
         },
         onDownloadProgress: function (progressEvent){
            if(showDownloadProgress){
               let percentageCompleted = Math.round((progressEvent.loaded* 100)/ progressEvent.total)
               showDownloadProgress(percentageCompleted);
            }
         }
      })
   
}

export { API } ;