
import {useEffect, useState} from 'react'

export const isFalsy = (value :any) => value === 0 ? false : !value;
export const cleanObject = (object:object) => {
    const result = { ...object };
    Object.keys(object).forEach(key => {
        //@ts-ignore
        const value = object[key];
        if (isFalsy(value)) {
            //@ts-ignore
            delete result[key];
        }
    })
    return result;
}


export const useMount = (callback :()=>void) => {
    useEffect(() => {

        callback();
    }, [])
}


const debounce = (func :any, delay: number)=>{
    let timeout: any; 
   return (...params: any)=>{
       if(timeout){
           clearTimeout(timeout)
       }
       timeout = setTimeout(()=>{
           func(...params);
       }, delay)
   }
}

export const useDebounce = (value:any, delay?: number) =>{
    const [debouncedValue, setDebouncedValue] = useState(value); 

    useEffect(() => {
        const timeout = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay)
        return () => clearTimeout(timeout);
    }, [value, delay])

    return debouncedValue;

}