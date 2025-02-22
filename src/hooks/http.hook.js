import {useCallback, useState} from "react";
export  const useHttp = () => {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const request = useCallback(async (url, method = "get", body=null, headers={}) => {
        setLoading(true)
        try {
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = "application/json"
            }
           const response = await fetch(url, {method,body,headers})
          const data = await response.json()

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }
    },[])
    return {loading, request, error}
}