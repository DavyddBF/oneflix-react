import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import api from "../../services/api";
import FilmeType from "../../filmes";

import './filme.css';

function Filme(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState<FilmeType>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregaApi() {
            await api.get(`movie/${ id }`, {
                params: {
                    api_key: '184ee90db92bf2330058b37260977a7f',
                    language: 'pt-BR'
                }
            }).then((resposta) => {
                setFilme(resposta.data);
                setLoading(false);
            }).catch(() => {
                console.log('Erro');

                navigate('/', { replace: true });
            });
        }

        carregaApi();

        return () => {
            console.log('Componente desconstruido');
        }
    }, [navigate, id]);

    function salvarFilme() {
        const listaFilme: string | null = localStorage.getItem('@oneflix');
        
        let filmesSalvos: any[] = listaFilme ? JSON.parse(listaFilme) : [];

        const hasFilme: boolean = filmesSalvos.some( (filmesSalvos) => {
            return filmesSalvos.id === filme.id;
        })

        if(hasFilme) {
            toast.warn('Este filme já na lista de favoritos!!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@oneflix', JSON.stringify(filmesSalvos));
        toast.success('Filme adicionado aos favoritos com sucesso!!');
    }

    if(loading) {
        return (
            <div className="loading">
                <h1>Carregando...</h1>
            </div>
        );
    }

    return (
        <div className="filme-container">
            <div className="filme-div">
                <div>
                    <h1>{ filme.title }</h1>
                    <img src={ `https://image.tmdb.org/t/p/original/${filme.backdrop_path}` } alt="" />
                </div>
                <div>
                    <h3>Sinopse</h3>
                    <span>{ filme.overview }</span>
                    <strong>Avaliação: { filme.vote_average?.toFixed(2) } / 10</strong>
                </div>
                <div className="area__btn">
                    <button onClick={ salvarFilme }>Salvar</button>
                    <button>
                        <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${ filme.title } Trailer`}>Trailer</a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filme;