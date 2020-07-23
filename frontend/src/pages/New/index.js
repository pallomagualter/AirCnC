import React, { useState, useMemo } from 'react'; //useMemo serve para realizar o preview da imagem, ele fica observando alterações e atualizando a cada mudança

import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) { //history usado para navegação que vem como uma poprriedade do componente , serve para direciona o usário para página destino
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => { //assim com o useEffect ele recebe dois parâmetro, o primeiro é uma função
        return thumbnail ? URL.createObjectURL(thumbnail) : null; //cria uma URL para uma variável temporária, que ainda não foi criada
        }, [thumbnail]) //segundo é um array de quando ele deve executar, que variável quando alterada ele executará novamente
    
    async function handleSubmit(event) { //Quando o usuário realizar o submit no site
        event.preventDefault();

        const data = new FormData(); //Como não os dados não são formato Json não é necessário usar Formdata
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail); //serve para adicionar informação em cada um do objeto data
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''} //se houver uma thumbnail (or preview) cria essa "has-thumbnail", senão não bota nada
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={ event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={ event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia."
                value={price}
                onChange={ event => setPrice(event.target.value)}
            />

                <button className="btn" type="submit">CADASTRAR</button>

        </form>
    )
}