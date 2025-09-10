const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </>
    )
}



const Header = ({ name }) => {
    return <h1>{name}</h1>
}

const Content = ({ parts }) => {
    console.log(parts)
    // const total = parts[0].exercises+parts[1].exercises+parts[2].exercises
    // console.log("sum of exercises are: ", total)
    const total = parts.reduce((s, p) => {
        console.log('what is happening', s, "p= ", p)
        return s + p.exercises
    }, 0)

    return (
        <div>
            <div>
                {
                    parts.map((part) => {
                        return <Part key={part.id} part={part} />
                    })
                }
            </div>
            <p>Total Exersice: {total}</p>
        </div>
    )
}


const Part = ({ part }) => {
    console.log("single part", part)
    return <p key={part.id}>{part.name} ex: {part.exercises}</p>

}

export default Course