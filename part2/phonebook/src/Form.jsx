const Form = ({ addPerson, handlePersonChange, handlePhoneChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input placeholder="name here" onChange={handlePersonChange} />
            </div>
            <div>
                Phone: <input type='phone' placeholder="Phone" onChange={handlePhoneChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form