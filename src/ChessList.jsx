import React, { useSate, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ChessList = () => {
    const [chesses, setChesses] = useState([]);
    const [isPending, setPending] = useState(false);
    
    useEffect(() =>{
        setPending(true);
        axios.get('https://chess.sulla.hu/chess')
        .then((valasz) => valasz.data)
        .then((sakkosok) => setChesses(sakkosok))
        .catch((hiba) => console.log(hiba))
        .finally(() => setPending(false));
    }, []);

    return(
        <div className='p-5 m-auto text-center content bg-ivory'>
            {isPending ? (<div className='spinner-border'></div>) : (
                <div>
                    <h2>Sakkozók</h2>
                    <div className='row row-cols-1 row-cols-md-3 g-4'>
                    {chesses.map((chess, index) => (
                        <div className='col' key={index}>
                        <div className='card h-100'>
                            <p className='text-dark'>Sakkozó neve: {chess.name}</p>
                            <p className='text-dark'>Születési éve: {chess.birth_date}</p>
                            <p className='text-dark'>Megnyert világbajnokságai: {chess.world_ch_won}</p>
                            <div className='card-body'>
                                <Link to={chess.profile_url} className='fs-4' target='_blank'>Profil link</Link>
                                <Link key={chess.id} to={`/chess/${chess.id}`}><img src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"} alt={chess.name} className='img-fluid' style={{width: "200"}}/></Link>    
                            </div>
                            <div>
                                    <Link to={`/chess/${chess.id}`}><i className='bi bi-text-paragraph fs-2'></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/mod-chess/${chess.id}`}><i className='bi bi-pencil-square fs-2'></i></Link>&nbsp;&nbsp;&nbsp;
                                    <Link to={`/del-chess/${chess.id}`}><i className='bi bi-backspace-fill fs-2'></i></Link>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
}