import React from 'react';

const PersonForm = ({handleNameChange, newName, handlePhoneChange, newPhone, addPersonIntoPhonebook}) => {
    return (
        <form>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>number: <input onChange={handlePhoneChange} value={newPhone}/></div>
        <div>
          <button type="submit" onClick={addPersonIntoPhonebook}>add</button>
        </div>
      </form>
    );
};

export default PersonForm;