import React from 'react'

const ClassCreateModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log(showHideClassName);
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose} type="button">close</button>
      </section>
    </div>
  );
};

export default ClassCreateModal;
