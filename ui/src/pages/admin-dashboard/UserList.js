import React from 'react'
import { useFetch } from '../../common/hooks/useFetch'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function List() {
  let [data, loading] = useFetch('/api/questionnaire/items')

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
          <th>Date de mise à jour</th>
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
                  <td>{moment(item.createdAt).format('DD/MM/YYYY hh:mm')}</td>
                  <td>{moment(item.updatedAt).format('DD/MM/YYYY hh:mm')}</td>
                  <td>
                    <Link to={`/admin/${item.questionnaire_id}`}>Détails</Link>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>
  )
}
