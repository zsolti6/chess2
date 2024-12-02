import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import { ChessMod } from "./ChessMod";

export const ChessSingle = () => {
    const { chessId } = useParams();
    const [chess, setChess] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try{
                const valasz = await axios.get(`https://chess.sulla.hu/chess/${chessId}`);
                const sakkos = await valasz.data;
                setChess(sakkos);
            }
            catch(hiba){
                console.log(hiba);
            }
            finally{
                setPending(false);
            }
        })();
        
    }, [chessId]);

    return(
        <div className='p-5 m-auto text-center content bg-ivory'>
            {isPending || !chessId ? (<div className='spinner-border'></div>) : (
                <div>
                    <h1>Sakkozók</h1>
                    <div className='row row-cols-1 row-cols-md-3 g-4 justify-content-center align-items-center'>
                        <div className='col '>
                            <div className='card h-200'>
                                <h3 className='text-dark'>Sakkozó neve: {chess.name}</h3>
                                <h4 className='text-dark'>Születési éve: {chess.birth_date}</h4>
                                <h4 className='text-dark'>Megnyert világbajnokságai: {chess.world_ch_won}</h4>
                                <div className='card-body'>
                                    <Link to={chess.profile_url} className='fs-6' target='_blank'>Profil link</Link>
                                    <img src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"} alt={chess.name} className='img-fluid' style={{width: "250"}}/>    
                                </div>
                                <div>
                                    <Link to={`/del-chess/${chessId}`}><i className='bi bi-backspace-fill fs-2'></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/mod-chess/${chessId}`}><i className='bi bi-pencil-square fs-2'></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}