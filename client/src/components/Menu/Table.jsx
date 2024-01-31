import React from 'react'

const Table = ({data}) => {
    const dayIdx = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
    <div>
      <h2>Mess data</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            return <tr key={index}>
              <td>{data.day ? data.day : dayIdx[index]}</td>
              <td>
                  {data.breakfast}
              </td>
              <td>
                  {data.lunch}
              </td>
              <td>
                  {data.dinner}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
    )
    
}

export default Table