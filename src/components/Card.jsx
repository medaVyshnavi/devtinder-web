import React from 'react'

const Card = ({ user }) => {

  const {firstName, lastName, gender, photoURL,age,about} = user
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-5 pt-5">
        <img src={photoURL} alt="Shoes" className="rounded-full w-2/3" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <h3>{gender?.toUpperCase()} { age}</h3>
        <p>{about}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default Card