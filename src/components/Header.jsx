import { useState, useRef, useLayoutEffect } from 'react';
import './Header.scss'
import {Link} from 'react-router-dom';

function Header() {
const [activeDropdown, setActiveDropdown] = useState(null);
  const [isFullyActive, setIsFullyActive] = useState(false);
  const [bgStyle, setBgStyle] = useState({
    width: 0,
    height: 0,
    transform: 'translate(0px, 0px)',
  });
  const [bgPositionClass, setBgPositionClass] = useState('');

  const navRef = useRef(null);
  const timerRef = useRef(null);
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    if (activeDropdown === null) return;

    const triggerEl = itemRefs.current[activeDropdown];
    const dropdown = triggerEl?.querySelector('.dropdown');
    if (!dropdown || !navRef.current) return;

    const pos = dropdown.dataset.position || '';
    const coordsDropdown = dropdown.getBoundingClientRect();
    const coordsNav = navRef.current.getBoundingClientRect();

    const coords = {
      width: coordsDropdown.width,
      height: coordsDropdown.height,
      top: coordsDropdown.top - coordsNav.top,
      left: coordsDropdown.left - coordsNav.left,
    };

    setBgStyle({
      width: `${coords.width}px`,
      height: `${coords.height}px`,
      transform: `translate(${coords.left}px, ${coords.top}px)`,
    });
    setBgPositionClass(pos);
  }, [activeDropdown]);

  const handleEnter = (index) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setActiveDropdown(index);
    setIsFullyActive(false);

    timerRef.current = setTimeout(() => {
      setIsFullyActive(true);
    }, 200);
  };

  const handleLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setIsFullyActive(false);
      setBgPositionClass('');
    }, 100);
  };

  const getItemClass = (index) => {
    if (activeDropdown !== index) return '';
    return `trigger-enter ${isFullyActive ? 'trigger-enter--active' : ''}`;
  };

  return (
      <header className="header">
      <nav id="navigation" ref={navRef} onTouchStart={handleLeave}>
        <div
          className={`dropdown-bg ${activeDropdown !== null ? 'active' : ''} ${bgPositionClass}`}
          style={bgStyle}
        >
          <span className="arrow"></span>
        </div>

        <ul className="list-unstyled">
          <li
            ref={(el) => (itemRefs.current[0] = el)}
            data-dropdown
            className={getItemClass(0)}
            onMouseEnter={() => handleEnter(0)}
            onMouseLeave={handleLeave}
          >
            <Link to ="/lore">Lore</Link>
            <div className="dropdown dropdown--about">
              <span>
              Lore de Bloodborne en orden cronológico.
              Desde los Pthumerios hasta la Noche de la Cacería.
            </span>
            </div>
          </li>

          <li
            ref={(el) => (itemRefs.current[1] = el)}
            data-dropdown
            className={getItemClass(1)}
            onMouseEnter={() => handleEnter(1)}
            onMouseLeave={handleLeave}
          >
            <a href="#">Categorías</a>
            <div className="dropdown dropdown--works">
              <span>
              <ul className="list-unstyled">
                <li><a href="#">Personajes</a></li>
                <li><a href="#">Locaciones</a></li>
                <li><a href="#">Armas</a></li>
                <li><a href="#">Vestimenta</a></li>                
                <li><a href="#">Herramientas</a></li>
                <li><a href="#">Objetos</a></li>
              </ul>
              </span>
            </div>
          </li>

          <li
            ref={(el) => (itemRefs.current[2] = el)}
            data-dropdown
            className={getItemClass(2)}
            onMouseEnter={() => handleEnter(2)}
            onMouseLeave={handleLeave}
          >
            <a href="#">Zennael</a>
            <div className="dropdown dropdown--socials">
              <a href="#" className="social social--fb">Github</a>
              <a href="#" className="social social--tw">Twitter</a>
              <a href="#" className="social social--in">Instagram</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
    );
  }

  export default Header;