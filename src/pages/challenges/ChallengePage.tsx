import React from "react";
import {useParams} from "react-router-dom";
import {useCrudQuery} from "../../hooks/useCrudQuery";
import {firestoreCrudService} from "../../services/firestoreCrudService";
import {Challenge} from "../../models/Activity";
import {CheckIcon} from "../AgendaPage";


export const ChallengePage = () => {

    const {challengeId} = useParams<{ challengeId: string }>();
    const {value} = useCrudQuery<Challenge>(challengeId, firestoreCrudService('challenges'))

    if (!value) {
        return (
            <div style={{width: '100vw', backgroundColor: 'white'}}>
                <div style={{height: 56, backgroundColor: '#F7F7F7'}}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vw'}}>
                    Challenge could not be found
                </div>
            </div>
        )
    }

    return (
        <div style={{width: '100vw', backgroundColor: 'white'}}>
            <div style={{height: 56, backgroundColor: '#F7F7F7'}}/>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
                    {value.name}
                </div>
                <CheckIcon checked={value.checked}/>
            </div>
            <div>
                {value.description}
            </div>


        </div>
    )
}

export default ChallengePage;
