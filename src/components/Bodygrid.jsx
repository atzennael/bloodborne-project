
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Bodygrid.scss';

function Bodygrid({ items = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (!selectedItem) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedItem]);

  return (
    <div className="content-grid">

      {/* TARJETAS */}
      <div className="content-grid__items">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            className="content-grid__card"
            onClick={() => handleOpen(item)}
          >
            <div className="content-grid__image">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
            </div>

            <h3 className="content-grid__title">
              {item.title}
            </h3>
          </button>
        ))}
      </div>

      {/* VENTANA MODAL */}
      {selectedItem && createPortal(
        <div
          className="content-modal"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div
            className="content-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="content-modal-title"
          >

            <div className="content-modal__header">
              <h2 id="content-modal-title">
                {selectedItem.title}
              </h2>

              <button
                type="button"
                className="content-modal__close"
                onClick={handleClose}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="content-modal__body">
              {selectedItem.content}
            </div>

            <div className="content-modal__footer">
              <button
                type="button"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>,

        document.body
      )}

    </div>
  );
}

export default Bodygrid;
