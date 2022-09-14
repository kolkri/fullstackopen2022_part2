const Content = ({ content }) => {

    const initialValue = 0
    const total = content.reduce( (s, p) => s + p.exercises, initialValue)


    return (
      <div>
        {content.map(item => 
          <p key={item.id}>
            {item.name} {item.exercises}
          </p>
        )}
        <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
      </div>
    )
  }
  
  export default Content