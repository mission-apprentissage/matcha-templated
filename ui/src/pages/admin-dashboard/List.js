import React from 'react'
import { useFetch } from '../../common/hooks/useFetch'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function List() {
  let [data, loading] = useFetch('/api/questionnaire/items')
  console.log(data)
  return (
    <>
      {loading && <div>Chargement des données....</div>}
      <Table striped responsive='lg'>
        <thead>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Date de création</th>
          <th>Lien</th>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.candidat.nom}</td>
                  <td>{item.candidat.prenom}</td>
                  <td>{item.candidat.email}</td>
                  <td>{item.candidat.telephone}</td>
                  <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                  <td>
                    <Link to={`/admin/${item._id}`}>Détails</Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>
  )
}
