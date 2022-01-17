import {getUserInfo} from '../../utils/endpointRequests/userEndpoints';
import { testEndpoint } from '../../utils/endpointRequests/testEndpoints';
import { useState,useEffect } from 'react';

export default function Home() {
    const [serverResponse,setServerResponse]= useState('')

    useEffect(() => {
        testEndpoint()
        .then(res=>{
            setServerResponse(JSON.stringify(res));
        })
        .catch(err=>{
            setServerResponse(JSON.stringify(err));
        })
    }, [])

    return (
        <div>
            Server connection {serverResponse}
            <br/>
            <button onClick={()=>{getUserInfo()}}>test</button>
            home
        </div>
    )
}
