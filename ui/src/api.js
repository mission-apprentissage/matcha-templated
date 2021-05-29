import Axios from 'axios'

const API = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

const errorHandler = (error) => {
  if (error.response && error.response.data) {
    console.log("Erreur de l'API :", error)
  }
}

export const getFormulaire = (formId) => API.get(`/formulaire/${formId}`).catch(errorHandler)

export const postFormulaire = (form) => API.post(`/formulaire`, form).catch(errorHandler)

export const putFormulaire = (formId, form) => API.put(`/formulaire/${formId}`, form).catch(errorHandler)

export const postOffre = (formId, offre) => API.post(`/formulaire/${formId}`, offre).catch(errorHandler)

export const putOffre = (offreId, offre) => API.put(`/formulaire/${offreId}`, offre).catch(errorHandler)

export const getWithQS = (query) => API.get('/formulaire', { params: { query: JSON.stringify(query) } })
