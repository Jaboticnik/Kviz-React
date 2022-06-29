import React from "react";
import Zacetek from "./Sestavni-deli/Zacetek";
import Obrazec from "./Sestavni-deli/Obrazec";
import Obrazecvprasanja from "./Sestavni-deli/Obrazecvprasanja";


//Slogi
//Telefon
import './slogi/telefon-pokoncno/slog.css'
import './slogi/telefon-pokoncno/slog-zacetek.css'
import './slogi/telefon-pokoncno/slog-igre.css'
//Tablica
import './slogi/Tablica/slog.css'
import './slogi/Tablica/slog-zacetek.css'
import './slogi/Tablica/slog-igre.css'
//Manjsi zasloni
import './slogi/Manjsi-zasloni/slog.css'
import './slogi/Manjsi-zasloni/slog-zacetek.css'
import './slogi/Manjsi-zasloni/slog-igre.css'
//Racunalnik
import './slogi/Racunalnik/slog.css'
import './slogi/Racunalnik/slog-zacetka.css'
import './slogi/Racunalnik/slog-obrazca.css'


export default function Prikaz() {
    const [Prikaz, spremeniprikaz] = React.useState(false)
    const [CaszasprememboAPI, spremenisprememboAPI] = React.useState(false)
    const [API, SPREMEMBAAPI] = React.useState([])
    const [podatkivprasanj, spremembapodatkovvprasanj] = React.useState("")
    const [Vrstnired, spremenivrstnired] = React.useState([])
    const [podatki, spremenipodatke] = React.useState([
        [0],[0],[0],[0],[0]
    ])
    const [Konecigre, spremenikonec] = React.useState(false)
    const [Besedilozmage, spremenibesedilo] = React.useState("")

    function Pridobitocke(id, pravilnost) {
        spremenipodatke(staro => {
            let Niz = [...staro]
            for (let i = 0; i < API.results.length; i++) {
                if (id === API.results[i].question && pravilnost) {
                    Niz[i][0] = 1
                }
                else if (id === API.results[i].question && !pravilnost) {
                    Niz[i][0] = 0
                }
            }
            return Niz
        })

    }


    React.useEffect(() => {
        const Nakljucnostevilo = (razdalja, stevilo) => {
            let stevila = new Set();
            while (stevila.size < stevilo) {
                stevila.add(Math.floor(Math.random() * (razdalja - 1 + 1)));
            }
            return [...stevila];
        }

        spremenivrstnired(() => {
           return [
               Nakljucnostevilo(4, 4),
               Nakljucnostevilo(4, 4),
               Nakljucnostevilo(4, 4),
               Nakljucnostevilo(4, 4),
               Nakljucnostevilo(4,4)
           ]


        })



    }, [CaszasprememboAPI])



    function Pritiskgumba(Civciv, kukuc = false) {
        if (!Konecigre) {
        if (API !== [] && API.results !== undefined) {
            spremembapodatkovvprasanj(() => {
                return API.results.map(podatek => {
                    const parser = new DOMParser();
                    function Nepravilniodgovori() {
                        let Niz = []
                        podatek.incorrect_answers.map( (podatek1) => {
                            Niz.push(parser.parseFromString(`<!doctype html><body>${podatek1}`, 'text/html').body.textContent)
                        })
                        return Niz
                    }
                    const Pravilenodgovor = parser.parseFromString(`<!doctype html><body>${podatek.correct_answer}`, 'text/html').body.textContent
                    const napacniodgovori = parser.parseFromString(`<!doctype html><body>${podatek.incorrect_answers}`, 'text/html').body.textContent
                    const Vprasanje = parser.parseFromString(`<!doctype html><body>${podatek.question}`, 'text/html').body.textContent

                    const vrstniredj = () => {
                        let erstnired = ""
                        for (let i = 0; i < API.results.length; i++) {
                            if (podatek === API.results[i]) {
                                erstnired = Vrstnired[i]
                            }
                        }
                        return erstnired
                    }

                    return <Obrazecvprasanja
                        Vprasanje={Vprasanje}
                        Odgovori={[...Nepravilniodgovori(), Pravilenodgovor]}
                        Pravilen={Pravilenodgovor}
                        key={podatek.question}
                        id={podatek.question}
                        Preslikava={Pridobitocke}
                        Podatki={kukuc}
                        Vrstnired={vrstniredj()}
                    />
                })
            })
            spremeniprikaz(true)
        }
        }
    }

    function Preveripravilneodgovore() {
        if (!Konecigre) {
            const Vrednost = podatki[0][0] + podatki[1][0] + podatki[2][0] + podatki[3][0] + podatki[4][0]

            Pritiskgumba(false,true)
            spremenibesedilo("Pravilno: " + Vrednost + "/5")
            spremenikonec(true)
        }else {
            spremenibesedilo("")
            spremenikonec(false)
            spremeniprikaz(false)
            spremenisprememboAPI(prej => !prej)
            spremenipodatke([
                [0],[0],[0],[0],[0]
            ])
        }



    }


    //ZVRST VPRASANJ
    const [podatkibarve, nastavipodatkebarve] = React.useState({
        barva: ""
    })

    const Sprememba = (sprememba) => {
        nastavipodatkebarve(prejsnjipodatki => {
            const {name, value, type, checked} = sprememba.target
            return {
                ...prejsnjipodatki,
                [name]: type === "checkbox" ? checked : value
            }
        })

    }

    React.useEffect(() => {
        let povezava
        if (podatkibarve.barva === "") {
            povezava = "https://opentdb.com/api.php?amount=5&type=multiple"
        } else {
            povezava = `https://opentdb.com/api.php?amount=5&category=${podatkibarve.barva}&type=multiple`
        }
        fetch(povezava)
            .then(odziv => odziv.json())
            .then(odziv2 => SPREMEMBAAPI(odziv2))

    }, [CaszasprememboAPI, podatkibarve])



    return (
        <div>
            {Prikaz
                ? <Obrazec
                    Vprasanja={<div>{podatkivprasanj}</div>}
                    Preslikava={Preveripravilneodgovore}
                    Besedilozmage={Besedilozmage}
                    Konec={Konecigre}
                />
                : <Zacetek
                    preslikavabarve={Sprememba}
                    barvapodatki={podatkibarve}
                    API={API}
                    preslikava={Pritiskgumba}
                />}
        </div>
    )
}