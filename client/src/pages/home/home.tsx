import {getUserInfo} from '../../utils/endpointRequests/userEndpoints';


export default function Home() {
    return (
        <div>
            <button onClick={()=>{getUserInfo()}}>test</button>
            home
        </div>
    )
}
