import ContentGrid from './components/Bodygrid';
import madmansKnowledgeImg from './assets/MadmansKnowledge.png'
function Lore() {

  const loreItems = [
    {
      id: 1,
      title: 'Los Pthumerios',
      image: madmansKnowledgeImg,
      content: `Los Pthumerios fueron una antigua civilización que habitó las profundidades de la tierra.

Su sociedad estaba relacionada con los Grandes y con los secretos de la sangre.

A través de sus laberintos y tumbas podemos descubrir los orígenes de muchos de los acontecimientos que posteriormente afectarían a Yharnam.`
    },
    {
      id: 2,
      title: 'Byrgenwerth',
      image: madmansKnowledgeImg,
      content: `Byrgenwerth fue una institución dedicada al estudio y la investigación.

Sus eruditos descubrieron secretos que cambiarían para siempre el destino de Yharnam.`
    },
    {
      id: 3,
      title: 'La Iglesia de la Sanación',
      image: madmansKnowledgeImg,
      content: `La Iglesia de la Sanación se convirtió en una institución de enorme influencia en Yharnam.

Su relación con la sangre y sus investigaciones terminarían desencadenando terribles consecuencias.`
    },
    {
      id: 4,
      title: 'La Sangre Antigua',
      image: madmansKnowledgeImg,
      content: `La Sangre Antigua fue uno de los descubrimientos más importantes y peligrosos de la historia de Yharnam.`
    },
    {
      id: 5,
      title: 'La Noche de la Cacería',
      image: madmansKnowledgeImg,
      content: `Cuando cae la noche, los habitantes de Yharnam se refugian mientras los cazadores salen a las calles.`
    },
    {
      id: 6,
      title: 'Los Grandes',
      image: madmansKnowledgeImg,
      content: `Entidades misteriosas que existen más allá de la comprensión humana.`
    }
  ];

  return (
    <main className="lore-page">
      <h1>Lore de Bloodborne</h1>

      <ContentGrid items={loreItems} />
    </main>
  );
}

export default Lore;
