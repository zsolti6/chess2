import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export const ChessDel = () => {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess, setChess] = useState([]);
    useEffect(() => {
        (
            async () => {
                try{
                    const res = await fetch(`https://chess.sulla.hu/chess/${id}`);
                    const chess = await res.json();
                    setChess(chess);
                }
                catch(error){
                    console.log("Hiba: ", error);
                    
                }
            }
        )();
    }, [id])
    return(
        <div className="container mt-5">
            <h3 className='text-dark'>Sakkozó neve: {chess.name}</h3>
            <h4 className='text-dark'>Születési éve: {chess.birth_date}</h4>
            <h4 className='text-dark'>Megnyert világbajnokságai: {chess.world_ch_won}</h4>
            <div className='card-body'>
                <Link to={chess.profile_url} className='fs-6' target='_blank'>Profil link</Link>
                <img src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"} alt={chess.name} className='img-fluid' style={{width: "250"}}/>    
            </div>
            <form onSubmit={(event) => {
                event.preventDefault();
                fetch(`https://chess.sulla.hu/chess/${id}`, {
                    method: "DELETE",
                }).then(() => {
                    navigate("/");
                });
            }}>
                <button className="bi bi-trash3 fs-2" type="submit">Törlés</button>
                <button className="bi bi-trash3 fs-2">Vissza</button>
            </form>
            <div>
                <Link to={`/del-chess/${id}`}><i className='bi bi-backspace-fill fs-2'></i></Link>&nbsp;&nbsp;&nbsp;
                <Link to={`/mod-chess/${id}`}><i className='bi bi-trash3 fs-2'></i></Link>
            </div>
        </div>
    );
}