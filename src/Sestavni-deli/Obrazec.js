import React from "react";
import Obrazecvprasanja from "./Obrazecvprasanja";



export default function Obrazec(props) {
    const [podatki, spremenipodatke] = React.useState({
        prikazpravilnega:false
    })

    function Preveriresitev() {
        spremenipodatke(staro => {
            return {
                ...staro,
                prikazpravilnega: true
            }
        })
        props.Preslikava()
    }

    return (
        <div className="obrazec">
            <div className="obrazec-prostor">
                {props.Vprasanja}
                <div className="prostor-gumb-obrazec">
                    <p className="obrazec-besedilozmage">{props.Besedilozmage}</p>
                    <div className="prostor-gumb-nosilnik">
                    <button onClick={props.Preslikava} id="gumb-potrditev" className={props.Konec ? "obrazec-prostor-novaigra" : "obrazec-prostor-potrdi"}>{props.Konec ? "NOVA IGRA" : "PREVERI"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}