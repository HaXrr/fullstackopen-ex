const Form = ({ addPerson, handlePersonChange, handlePhoneChange, newName, phone }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input placeholder="name here" value={newName} onChange={handlePersonChange} />
            </div>
            <div>
                Phone: <input type='phone' placeholder="Phone" value={phone} onChange={handlePhoneChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form