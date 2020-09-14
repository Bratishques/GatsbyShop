import {useCallback, useState} from "react";
import {useHttp} from "../hooks/http.hook"


    export const useVerify = async token => {
    const { request, error } = useHttp()
      try {
        const verify = await request("/api/auth/token", "POST", "", {
          authorization: `Bearer ${token}`,
        })

      } catch (e) {
  
      }
    }

  

  
