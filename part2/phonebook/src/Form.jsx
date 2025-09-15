const Form = ({ addPerson, handlePersonChange, handlePhoneChange, newName, newNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input placeholder="name here" value={newName} onChange={handlePersonChange} />
            </div>
            <div>
                Phone: <input type='text' placeholder="Phone" value={newNumber} onChange={handlePhoneChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form