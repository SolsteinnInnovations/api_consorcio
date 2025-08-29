import { CorsOptions } from "cors";

export const corsConfig:CorsOptions = {
    origin: function (origin,callback){

        const whiteList = [
            process.env.FRONTEND_URL,
            'http://localhost:4200', 
            'http://localhost:3000', 
            'http://localhost:3001', 
            'http://127.0.0.1:5500' 
        ] 
    
        if( whiteList.includes(origin)){
            
            callback(null,true)
        }else{
            callback(new Error('Error de cors'))
        }


    }
}