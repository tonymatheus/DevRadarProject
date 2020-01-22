import React ,{useState,useEffect}from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css'


function App() {
  const [github_username, setGithubUsername] = useState(''); 
  const [techs, setTechs] = useState(''); 

  const [latitude, setlatitude] = useState(''); 
  const [longitude, setlongitude] = useState(''); 
   
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const {latitude , longitude }= position.coords ;
        setlatitude(latitude);
        setlongitude(longitude);
      },
      (err)=>{
        console.log(err);
      },
      {
        timeout:30000,
      }
    )
  })

  async function handleAddDev(e){
      e.preventDefaut();
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlfor="github_username">Usuári do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={github_username}
              onChange={e=>setGithubUsername(e.target.value)}  
            />
          </div>

          <div className="input-block">
            <label htmlfor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required
              value={techs}
              onChange={e=>setTechs(e.target.value)} 
              
            />
          </div>

          <div className="input-group">
            <div class="input-block">
              <label htmlfor="latitude">Latitude</label>
              <input 
                type = "number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e=> setlatitude(e.target.value)}
              />

            </div>

            <div className="input-block">
              <label htmlfor="longitude">Longitude</label>
              <input 
                type = "number " 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange ={e=> setlongitude(e.target.value)}
              />
          </div>
              
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43850888?s=460&v=4" alt="Tony Matheus "></img>
              <div className="user-info">
                <strong>Tony Matheus</strong>
                <span>Pyhton,Django, React.js ,Java </span>
              </div>
            </header>
            <p>Apaixonado por Tecnologia,sempre em busca da evolução do meu conhecimento.</p>
            <a href="https://github.com/tonymatheus">Acessar Perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43850888?s=460&v=4" alt="Tony Matheus "></img>
              <div className="user-info">
                <strong>Tony Matheus</strong>
                <span>Pyhton,Django, React.js ,Java </span>
              </div>
            </header>
            <p>Apaixonado por Tecnologia,sempre em busca da evolução do meu conhecimento.</p>
            <a href="https://github.com/tonymatheus">Acessar Perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43850888?s=460&v=4" alt="Tony Matheus "></img>
              <div className="user-info">
                <strong>Tony Matheus</strong>
                <span>Pyhton,Django, React.js ,Java </span>
              </div>
            </header>
            <p>Apaixonado por Tecnologia,sempre em busca da evolução do meu conhecimento.</p>
            <a href="https://github.com/tonymatheus">Acessar Perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43850888?s=460&v=4" alt="Tony Matheus "></img>
              <div className="user-info">
                <strong>Tony Matheus</strong>
                <span>Pyhton,Django, React.js ,Java </span>
              </div>
            </header>
            <p>Apaixonado por Tecnologia,sempre em busca da evolução do meu conhecimento.</p>
            <a href="https://github.com/tonymatheus">Acessar Perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/43850888?s=460&v=4" alt="Tony Matheus "></img>
              <div className="user-info">
                <strong>Tony Matheus</strong>
                <span>Pyhton,Django, React.js ,Java </span>
              </div>
            </header>
            <p>Apaixonado por Tecnologia,sempre em busca da evolução do meu conhecimento.</p>
            <a href="https://github.com/tonymatheus">Acessar Perfil no Github</a>
          </li>

        </ul>

      </main>
    </div>

  );
}

export default App;
