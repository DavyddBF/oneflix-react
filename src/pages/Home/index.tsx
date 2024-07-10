import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

import api from "../../services/api";
import FilmeType from "../../filmes";
import './home.css';

function Home(): JSX.Element {
    const [filmes, setFilmes] = useState<FilmeType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect( () => {
        async function carregaApi(): Promise<void> {
            const resposta: AxiosResponse<any, any> = await api.get('movie/now_playing', {
                params: {
                    api_key: '184ee90db92bf2330058b37260977a7f',
                    language: 'pt-BR',
                    page: 1
                }
            });

            const resultados: FilmeType[] = resposta.data.results;
            setFilmes(resultados);
            setLoading(false);
        }

        carregaApi();
    }, []);

    if(loading) {
        return (
            <div className="loading">
                <h1>Carregando...</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="filmes__lista">
                {
                    filmes.map((filme: FilmeType) => {
                        return (
                            <article key={ filme.id }>
                                <div>
                                    <strong className="filmes__titulo">{ filme.title }</strong>
                                </div>
                                <div>
                                    <img className="filmes__img" src={ `https://image.tmdb.org/t/p/original/${ filme.poster_path }` } alt={ filme.title } />
                                </div>
                                <div>
                                    <Link className="filmes__acessar" to={ `/filme/${ filme.id }` }>Acessar</Link>
                                </div>
                            </article>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Home;