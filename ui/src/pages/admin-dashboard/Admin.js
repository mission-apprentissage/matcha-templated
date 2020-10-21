import React from 'react'
import { useFetch } from '../../common/hooks/useFetch'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default (props) => {
  const { params } = props.match
  let [data, loading] = useFetch(`/api/questionnaire/items/${params.id}`)

  console.log(data)

  return (
    <>
      {loading && <div>Chargement des données....</div>}
      {data && (
        <div>
          {data.map(({ candidat, mobilite, voeux, experiences, recommandations, activites }, index) => {
            return (
              <div key={index}>
                <p className='mb-0'>
                  {candidat && candidat.prenom} {candidat && candidat.nom}{' '}
                </p>
                <p className='mb-0'>
                  {candidat && candidat.email} — {candidat && candidat.telephone}
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
                <p className=''>Expériences :</p>
                {experiences &&
                  experiences.map((experience, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <p className='mb-0'>
                            {experience.nom} du {moment(experience.dateDebut).format('DD/MM/YYYY')} au{' '}
                            {moment(experience.dateFin).format('DD/MM/YYYY')}
                          </p>
                          <p className='mb-0'>
                            Entreprise : {experience.nomEntreprise} — {experience.adresseEntreprise}
                          </p>
                          <p className='mb-0'>Tâches :</p>
                          {experience.taches.map((tache, index) => {
                            return <ul key={index}>{tache} </ul>
                          })}
                          <p></p>
                        </li>
                      </ul>
                    )
                  })}
                <p className=''>Activités :</p>
                {activites &&
                  activites.map((activite, index) => {
                    return (
                      <ul key={index}>
                        <li>
                          <p className='mb-0'>
                            {activite.nom} - {activite.periodicite}
                          </p>
                          <p className='mb-0'>Critères :</p>
                          {activite.criteres &&
                            activite.criteres.map((critere, index) => {
                              return <ul key={index}>{critere}</ul>
                            })}
                        </li>
                      </ul>
                    )
                  })}
                <p className=''>Recommandations :</p>
                {recommandations &&
                  recommandations.map((reco, index) => {
                    return (
                      <ul>
                        <li>
                          <p className='mb-0'>
                            {reco.prenom} {reco.nom}
                          </p>
                          <p className='mb-0'>
                            {reco.email} {reco.telephone}
                          </p>
                          <p>Role : {reco.role}</p>
                        </li>
                      </ul>
                    )
                  })}
              </div>
            )
          })}
          <Link to='/admin'>
            <Button>Retour</Button>
          </Link>
        </div>
      )}
    </>
  )
}
