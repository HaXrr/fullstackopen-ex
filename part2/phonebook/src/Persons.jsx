const Persons = ({ personsToShow }) => {
    return (
        <div>
            {
                personsToShow.map((person, i) => {
                    return <p key={i} >name: {person.name}  _____  phone: {person.number}</p>

                })
            }
        </div>
    )
}

export default Persons