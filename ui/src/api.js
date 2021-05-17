import Axios from 'axios'

const API = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

const errorHandler = (error) => {
  if (error.response && error.response.data) {
    console.log("Erreur de l'API :", error.response.data.data)
  }
}

export const getFormulaire = async (formId) => await API.get(`/formulaire/${formId}`).catch(errorHandler)
export const saveFormulaire = async (formId, payload) =>
  await API.post(`/formulaire/${formId}`, payload).catch(errorHandler)
