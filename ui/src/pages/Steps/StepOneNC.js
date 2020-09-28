import React from 'react'
import { DropdownCombobox } from '../../components'
import { Col } from 'react-bootstrap'
import { StepTitle, ChatBubble, QuestionTitle } from '../../components'

/**
 * {
  "etablissement_reference_id": {},
  "educ_nat_specialite_lettre": "string",
  "etablissement_formateur_id": {},
  "siren": "string",
  "info_bcn_intitule_court": 0,
  "etablissement_reference_datadock": "string",
  "entreprise_raison_sociale": "string",
  "published_old": false,
  "etablissement_reference_conventionne": "string",
  "rncp_code": "string",
  "source": "string",
  "mef_10_code": "string",
  "etablissement_responsable_uai": "string",
  "etablissement_reference_catalogue_published": false,
  "educ_nat_specialite_libelle": "string",
  "etablissement_responsable_declare_prefecture": "string",
  "intitule_court": "string",
  "draft": false,
  "etablissement_formateur_enseigne": "string",
  "etablissement_formateur_conventionne": "string",
  "computed_bcn_mef": "string",
  "educ_nat_code": "string",
  "diplome": "string",
  "info_bcn_niveau": 0,
  "mef_8_codes": [
    "string"
  ],
  "nom_academie_siege": "string",
  "geo_coordonnees_etablissement_reference": "string",
  "etablissement_formateur_datadock": "string",
  "rome_codes": [
    "string"
  ],
  "nom_academie": "string",
  "info_bcn_mef": 0,
  "code_commune_insee": "string",
  "published": false,
  "intitule": "string",
  "etablissement_responsable_conventionne": "string",
  "num_departement": "string",
  "etablissement_responsable_catalogue_published": false,
  "num_academie_siege": 0,
  "computed_bcn_code_en": "string",
  "etablissement_responsable_type": "string",
  "num_academie": 0,
  "rncp_intitule": "string",
  "affelnet_reference": "string",
  "parcoursup_reference": "string",
  "etablissement_formateur_published": false,
  "rncp_eligible_apprentissage": false,
  "last_update_at": "2020-09-28T15:17:29.101Z",
  "computed_bcn_diplome": "string",
  "info_bcn_intitule_long": 0,
  "_id": "string",
  "etablissement_responsable_id": {},
  "etablissement_responsable_siret": "string",
  "mef_8_code": "string",
  "etablissement_responsable_published": false,
  "created_at": "2020-09-28T15:17:29.102Z",
  "etablissement_formateur_uai": "string",
  "annee": "string",
  "etablissement_responsable_datadock": "string",
  "rncp_etablissement_reference_habilite": false,
  "nom": "string",
  "periode": "string",
  "capacite": "string",
  "rncp_etablissement_responsable_habilite": false,
  "etablissement_responsable_enseigne": "string",
  "mef_10_codes": [
    "string"
  ],
  "mef_10_code_updated": false,
  "duree": "string",
  "onisep_url": "string",
  "etablissement_reference_type": "string",
  "email": "string",
  "computed_bcn_intitule_long": "string",
  "educ_nat_specialite_libelle_court": "string",
  "etablissement_reference": "string",
  "code_postal": "string",
  "intitule_long": "string",
  "etablissement_formateur_type": "string",
  "etablissement_formateur_catalogue_published": false,
  "etablissement_reference_declare_prefecture": "string",
  "niveau": "string",
  "rncp_etablissement_formateur_habilite": false,
  "parcoursup_a_charger": false,
  "etablissement_reference_published": false,
  "to_verified": false,
  "affelnet_a_charger": false,
  "etablissement_formateur_siret": "string",
  "etablissement_formateur_declare_prefecture": "string",
  "uai_formation": "string",
  "last_modification": "string",
  "computed_bcn_intitule_court": "string",
  "info_bcn_diplome": 0,
  "commentaires": "string",
  "info_bcn_code_en": 0,
  "computed_bcn_niveau": "string",
  "ds_id_dossier": "string"
}
 */

export default () => {
  const [inputJobItems, setInputJobItems] = React.useState([])
  const [inputFieldItems, setInputFieldItems] = React.useState([])
  const handleJobSearch = async (search) => {
    if (search) {
      const result = await fetch(`https://idea-mna-api.herokuapp.com/romelabels?title=${search}`)
      const data = await result.json()
      return data.labelsAndRomes
    }
    return inputJobItems
  }

  const handleFieldSearch = async (search) => {
    if (search) {
      try {
        // const result = await fetch(
        //   `https://idea-mna-api.herokuapp.com/formations?rome=${search}&longitude=2.2&latitude=47&radius=20000`
        // )
        // const result = await fetch(`https://c7a5ujgw35.execute-api.eu-west-3.amazonaws.com/prod/formations`, {
        //   limit: 100,
        //   query: {
        //     intitule: search,
        //     niveau: '3 (CAP...)',
        //   },
        // })
        const data = await result.json()
        console.log('coucou', data)
      } catch (error) {
        throw new Error(error)
      }
    }
    return inputFieldItems
  }

  return (
    <Col>
      <StepTitle>Etape 1/6 - Votre recherche </StepTitle>
      <ChatBubble>Quel est votre projet ? Je chercherai des entreprises qui y correspondent !</ChatBubble>
      <QuestionTitle title='Sur quel(s) métier(s) souhaitez-vous trouver un contrat en apprentissage ? ' />
      <DropdownCombobox handleSearch={handleJobSearch} inputItems={inputJobItems} setInputItems={setInputJobItems} />
      <QuestionTitle title="Dans quelle(s) formation(s) êtes-vous inscrit ou avez-vous l'intention de vous inscire ? " />
      <DropdownCombobox
        handleSearch={handleFieldSearch}
        inputItems={inputFieldItems}
        setInputItems={setInputFieldItems}
      />
    </Col>
  )
}
