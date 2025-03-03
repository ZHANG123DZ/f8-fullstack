import React from 'react'

function ProductList({data, isGrid}) {
  if (!isGrid) return (
    <>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </>
  )
  return (
    <div className='grid'>
        {data.map(item => (
            <div key={item.id}>
                <h2>{item.title}</h2>
                <span>{item.price}</span>
                <p>{item.description}</p>
            </div>
        ))}
    </div>
  )
}

export default ProductList
