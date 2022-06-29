import React from "react";



export default function Zacetek(props) {

    const [podatki, nastavipodatke] = React.useState({
        barva: ""
    })

    const Sprememba = (sprememba) => {
        nastavipodatke(prejsnjipodatki => {
            const {name, value, type, checked} = sprememba.target
            return {
                ...prejsnjipodatki,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function Pocakajte() {

    }


    return (
        <div className="zacetek">
            <div className="padinganje">
                <div className="naslovnica-zacetek">
                    <div className="zacetek-nevidno"></div>
                    <h1 className="naslov-zacetek">Kviz</h1>
                    <p className="jezik">SI</p>
                </div>
                <p className="besedilo">Odgovori na vprašanja ter se poteguj za pravilne odgovore.</p>
                <p className="zvrst-vprasanj">Zvrst:</p>
                <div className="izbirnik-celota">
                <select
                    id="najljubsabarva"
                    value={props.barvapodatki.barva}
                    onChange={props.preslikavabarve}
                    name="barva"
                    placeholder="Izberi"
                    className="izbrinik-zacetek"
                >
                    <option value="">MEŠANO </option>
                    <option value="23">Zgodovina</option>
                    <option value="27">Živali</option>
                    <option value="17">Naravoslovje</option>
                    <option value="21">Šport</option>
                    <option value="22">Zemljepis</option>
                    <option value="28">Vozila</option>
                    <option value="18">Računalništvo</option>
                    <option value="24">Politika</option>
                    <option value="12">Glasba</option>
                    <option value="11">Film</option>

                </select>
            </div>
                <div className="nosilec-gumba">
                    <button onClick={props.API === [] || props.API.results === undefined ? Pocakajte : props.preslikava} className="potrdi">{props.API === [] || props.API.results === undefined ? "Nalaganje..." : "Začni"}</button>
                </div>
            </div>
        </div>
    )
}