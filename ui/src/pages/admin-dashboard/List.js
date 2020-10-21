import React from 'react'
import { useFetch } from '../../common/hooks/useFetch'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function List() {
  let [data, loading] = useFetch('/api/questionnaire/items')
  console.log(data)
  return (
    <div>
      {loading && <div>Chargement des données....</div>}
      <Table>
        <thead>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Lien</th>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              console.log(item._id)
              return (
                <tr key={index}>
                  <td>{item.candidat.nom}</td>
                  <td>{item.candidat.prenom}</td>
                  <td>{item.candidat.email}</td>
                  <td>{item.candidat.telephone}</td>
                  <td>
                    <Link to={`/admin/${item._id}`}>Voir le profile</Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}
