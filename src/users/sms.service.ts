/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { log } from "console";

@Injectable()
export class SmsService{
    apiUrl:string = process.env.HOSTNAME;
    apiKey:string = process.env.APIKEY;
    url :string =`${this.apiUrl}${this.apiKey}`


    async sendOtpCode(text:string,to:string){
        log(this.url,typeof this.url);
       await axios.post(this.url,{ 
            "from": "50004001724724", 
            "to": to, 
            "text": text
          }).then((res)=>console.log(res)
          ).catch((e)=>{console.log(e);
          })
      
    }
}