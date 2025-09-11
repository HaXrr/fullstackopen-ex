const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <div>
            {
                personsToShow.map((person, i) => {
                    return <div key={i} >
                        <p  >name: {person.name}  _____  phone: {person.number}</p>
                        <button onClick={()=>handleDelete(person.id)} >X</button>
                        
                         </div>
                })
            }
        </div>
    )
}

export default Persons