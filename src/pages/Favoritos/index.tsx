import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import FilmeType from "../../filmes";

import './favoritos.css';

function Favoritos(): JSX.Element {
    const [filme, setFilme] = useState<FilmeType[]>([]);

    useEffect(() => {
        const listaFilme: string | null = localStorage.getItem('@oneflix');
        setFilme(listaFilme ? JSON.parse(listaFilme) : []);
    }, []);

    function excluirFilme(id: any) {
        let filmesFiltrados = filme.filter((cadaFilme) => {
            return cadaFilme.id != id;
        });

        setFilme(filmesFiltrados);
        localStorage.setItem('@oneflix', JSON.stringify(filmesFiltrados));
        toast.success('Filme removido com sucesso!!');
    }

    return (
        <div className="meus__filmes">
            <h1>Filmes Favoritos:</h1>

            {filme.length == 0 && <span>Nenhum filme nos seus favoritos :(</span>}

            <ul>
                {filme.map((filme) => {
                    return (
                        <li key={ filme.id }>
                            <span>{ filme.title }</span>
                            <div>
                                <Link to={`/filme/${ filme.id }`}>Ver detalhes</Link>
                                <button onClick={ () => excluirFilme(filme.id) }>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;