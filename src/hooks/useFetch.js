import { useState, useEffect } from 'react';
import Axios from 'axios';

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
};
