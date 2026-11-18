import './App.scss';
import './body-cards.scss';
import MusicPlayer from './components/music-player';
import Header from './components/Header';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Lore from './Lore';

function Home(){
  return (
  <>
<section className="second-header">
      <div className="welcome-banner">
        <h1>Welcome home, Good Hunter</h1>
        <p>What is it you desire?</p>
      </div>
      </section>
      <div className="project-grid">
        <Link to="/lore">
      <section className="body-lore project-card">
        <div className="project-card__container">
          <h2 className="project-card__title">Lore</h2>
          <div className="project-card__text-block">
          <p>Antes de la ciudad de Yharnam que conocemos, los Grandes ya habían contactado a 
            una civilización: los Pthumerios. Esta es su antigua historia, y la historia de la tierra condenada de Yharnam.
            ¿No quieres saber qué pasó con ellos?
          </p>
          </div>
        </div>
      </section>
      </Link>
      <section className="body-personajes project-card">
        <div className="project.card__container">
          <h2 className="project-card__title">Personajes</h2>
          <div className="project-card__text-block">
          <p>Durante la Cacería, Yharnam está lleno de vida y de muerte. Todos tienen un nombre y un rol
            que cumplir y algo que decir, es momento de que sean escuchados. 
          </p>
          </div>
        </div>
      </section>
      <section className="body-locaciones project-card">
        <div className="project.card__container">
          <h2 className="project-card__title">Locaciones</h2>
          <div className="project-card__text-block">
          <p>Las Tumbas y los Laberintos, los Bosques, 
            las Iglesias, el Castillo de Cainhurst, los antiguos pueblos quemados y las aldeas pesqueras
            masacradas...
             Todos lugares que debes visitar.
          </p>
          </div>
        </div>
      </section>
      <section className="body-armas project-card">
        <div className="project.card__container">
          <h2 className="project-card__title">Armas</h2>
          <div className="project-card__text-block">
          <p>Un Cazador debe cazar, y dentro del Taller de la Iglesia tendrás todo lo que puedas necesitar,
            ¿o tal vez prefieres la pólvora? ¿Los brazos cercenados de un Dios menor? Ven, echa un vistazo.
          </p>
          </div>
        </div>
      </section>
      <section className="body-vestimenta project-card">
        <div className="project.card__container">
          <h2 className="project-card__title">Vestimenta</h2>
          <div className="project-card__text-block">
          <p>Las garras y colmillos de las bestias pueden matar a cualquiera, tanto como el disparo de un Cazador 
            ebrio de sangre. Algunas veces lo único que puede salvarte de la muerte es una vieja armadura de Sangrevil,
             o los viejos harapos amarillos de un viejo Cazador o, por último, el temible uniforme de los Verdugos.
          </p>
          </div>
        </div>
      </section>
      <section className="body-herramientas project-card">
        <div className="project.card__container">
          <h2 className="project-card__title">Herramientas</h2>
          <div className="project-card__text-block">
          <p>Un buen Cazador también es un erúdito, maneja las artes arcanas y es capaz de invocar el Augurio del 
            Grande olvidado, invocar las serpientes de antaño o responder a los susurros de la araña.
             ¿No has escuchado que los mejores cazadores se hicieron en Byrgenwerth? Como el sabio Caryll...
          </p>
          </div>
        </div>
      </section>
      <section className="body-objetos project-card">
        <div className="project.card__container">
          <h2 className="project-card__title">Objetos</h2>
          <div className="project-card__text-block">
          <p>El Cazador comulga con sangre, dispara con balas y mata con fuego o chispas azules. Uno siempre sabe cómo usar todo aquello
            que parece dispensable a su favor. Descubre todo aquello que puede salvarte en una cacería de sangre.
          </p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
function App() {

  return (
    <>
    <div className="app-container">
    <HashRouter>
    <Header/>
    <main className="app-main">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/lore" element={<Lore/>} />
    </Routes>
  </main>

    <footer className="app-footer">
      <MusicPlayer/>
    </footer>
</HashRouter>
</div>
    </>
  );
}


export default App;