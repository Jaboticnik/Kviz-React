import React from "react";

export default function Gumb(props) {
    const [Podatkigumb, spremenipodatkegumba] = React.useState(props.Gumbpodatki)

    let Barvagumba



    if (props.Podatki && props.Pridrzan && props.Pravilen !== props.Odgovori[props.besedilo]) {
        Barvagumba = {
            background: "linear-gradient(147deg, #ad2f26 0%, #99201c 74%)",
            color: "white",
            border: "none"
        }

    }else if (props.Podatki && props.Pravilen === props.Odgovori[props.besedilo]) {
        Barvagumba = {
            background: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)",
            color: "white",
            border: "none"
        }
    }else if (props.Podatki && !props.Pridrzan) {
        Barvagumba = {
            backgroundColor: "white"
        }
    } else if (props.Pridrzan && !props.Podatki) {
        Barvagumba = {
            background: "linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%)",
            border: "none"
        }
    }



    function Preverigumb() {
        if (!props.Podatki) {
            let Pravilen = false
            if (props.Pravilen === props.Odgovori[props.besedilo]) {
                Pravilen = true
            }
            props.Obpritisku(true, Pravilen, props.Odgovori[props.besedilo])
        }
    }


    return (
        <button onClick={Preverigumb} style={Barvagumba} className="gumb">{props.Odgovori[props.besedilo]}</button>
    )
}