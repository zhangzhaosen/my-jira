
import {useEffect, useState} from 'react'

export const isFalsy = value => value === 0 ? false : !value;
export const cleanObject = (object) => {
    const result = { ...object };
    Object.keys(object).forEach(key => {
        const value = object[key];
        if (isFalsy(value)) {
            delete result[key];
        }
    })
    return result;
}


export const useMount = (callback) => {
    useEffect(() => {

        callback();
    }, [])
}


const debounce = (func, delay)=>{
    let timeout; 
   return (...params)=>{
       if(timeout){
           clearTimeout(timeout)
       }
       timeout = setTimeout(()=>{
           func(...params);
       }, delay)
   }
}

export const useDebounce = (value, delay) =>{
    const [debouncedValue, setDebouncedValue] = useState(value); 

    useEffect(() => {
        const timeout = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay)
        return () => clearTimeout(timeout);
    }, [value, delay])

    return debouncedValue;

}