const Persons = ({persons, filter}) => {
    return (
        <>
        {persons.filter(item => {
            if(filter === ''){
              return item
          } else if (item.name.toLowerCase().includes(filter.toLowerCase())) {
              return item
          }
          }).map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
  }
  
  export default Persons