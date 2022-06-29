import React from "react";
import Gumb from "./Gumb";


export default function Obrazecvprasanja(props) {
    const [Pritisnjengumb, spremenipritisnjengumb] = React.useState({
        pritisnjen: false,
        pravilen: false,
        besedilo: ""
    })


    function Preverigumb(Pritisnjen, Pravilen, besedilo) {
        spremenipritisnjengumb((staro) => {
            return {
                ...staro,
                pritisnjen: Pritisnjen,
                pravilen: Pravilen,
                besedilo: besedilo
            }
        })
        props.Preslikava(props.id, Pravilen)
    }



    return (
        <div className="obrazec-vprasanje">
            <h2 className="obrazec-vprasanje-besedilo" >{props.Vprasanje}</h2>
            <div className="obrazec-gumbi">
                <Gumb Obpritisku={Preverigumb} Pridrzan={Pritisnjengumb.besedilo === props.Odgovori[props.Vrstnired[0]]}  Gumbpodatki={Pritisnjengumb} Pravilen={props.Pravilen} Podatki={props.Podatki} besedilo={props.Vrstnired[0]} Odgovori={props.Odgovori}/>
                <Gumb Obpritisku={Preverigumb} Pridrzan={Pritisnjengumb.besedilo === props.Odgovori[props.Vrstnired[1]]}  Gumbpodatki={Pritisnjengumb} Pravilen={props.Pravilen} Podatki={props.Podatki} besedilo={props.Vrstnired[1]} Odgovori={props.Odgovori}/>
                <Gumb Obpritisku={Preverigumb} Pridrzan={Pritisnjengumb.besedilo === props.Odgovori[props.Vrstnired[2]]}  Gumbpodatki={Pritisnjengumb}  Pravilen={props.Pravilen} Podatki={props.Podatki} besedilo={props.Vrstnired[2]} Odgovori={props.Odgovori}/>
                <Gumb Obpritisku={Preverigumb} Pridrzan={Pritisnjengumb.besedilo === props.Odgovori[props.Vrstnired[3]]}   Gumbpodatki={Pritisnjengumb} Pravilen={props.Pravilen} Podatki={props.Podatki} besedilo={props.Vrstnired[3]} Odgovori={props.Odgovori}/>

            </div>
            <hr className="obrazec-prostor-crta"/>
        </div>
    )
}