const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <div>
            {
                personsToShow.map((person, i) => {
                    return <div key={person._id} >
                        <p  >name: {person.name}  _____  phone: {person.number}</p>
                        <button onClick={() => handleDelete(person._id)} >X</button>

                    </div>
                })
            }
        </div>
    )
}

export default Persons