import Axios from 'axios'

const API = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

const errorHandler = (error) => {
  if (error.response && error.response.data) {
    console.log("Erreur de l'API :", error)
  }
}

export const getFormulaire = async (formId) => await API.get(`/formulaire/${formId}`).catch(errorHandler)

export const saveFormulaire = async (formId, payload) =>
  await API.post(`/formulaire/${formId}`, payload).catch(errorHandler)

export const getOffre = async (offreId, status) =>
  await API.put(`/formulaire/offre/${offreId}`, { status }).catch(errorHandler)

export const getWithQS = async (query) => await API.get('/formulaire', { params: { query: JSON.stringify(query) } })
