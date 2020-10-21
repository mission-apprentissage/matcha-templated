import React from 'react'
import { useFetch } from '../common/hooks/useFetch'

export default () => {
  const [data, loading] = useFetch('/api/questionnaire/items')
  console.log(data)

  return (
    <>
      {loading && <div>Chargement des données....</div>}
      {data && (
        <div>
          {data.map(({ candidat, mobilite, voeux }, index) => {
            return (
              <div key={index}>
                <p className='mb-0'>
                  {candidat && candidat.prenom && candidat.prenom} — {candidat && candidat.nom && candidat.nom}{' '}
                </p>
                <p className='mb-0'>
                  {candidat && candidat.email && candidat.email} —{' '}
                  {candidat && candidat.telephone && candidat.telephone}
                </p>
                <p>
                  {mobilite && mobilite.commune && mobilite.commune} —{' '}
                  {mobilite && mobilite.distance.label && mobilite.distance.label}
                </p>
                <p className=''>Voeux :</p>
                {voeux &&
                  voeux.map((voeu, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <p className='mb-0'>Formation : {voeu.formation}</p>
                          <p className='mb-0'>Etablissement : {voeu.etablissement}</p>
                          <p className='mb-0'>Metier visé: {voeu.metier.label}</p>
                        </li>
                      </ul>
                    )
                  })}
                <hr />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
