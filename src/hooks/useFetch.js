import { useState, useEffect } from 'react';
import Axios from 'axios';

Axios.defaults.baseURL = 'https://mindicador.cl/'; 

const useFetch = (axiosParams) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const fetchData = async (params) => {
        try {
            const result = await Axios.request(params);
            setResponse(result.data);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        fetchData(axiosParams);
        return()=> {
           setResponse(null)
           setError('')
           setloading(false)     
        }
    }, []);

    return { response, error, loading };
};

export default useFetch

/*
export default () => {
    const [isWorking, setIsWorking] = useState(false);
    const get = async (_path, _params = null) => {
        try {
            let resp;
            let config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
                params: _params
            };
            setIsWorking(true);
            resp = await Axios.get(_path, config);
            setIsWorking(false);
            return resp;
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        return () => {
            setIsWorking(false);
        }
    }, [isWorking]);

    return {
        get
    }
 */

