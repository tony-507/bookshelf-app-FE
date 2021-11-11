import { checkLoginApi, checkLogoutApi, validateLoginApi } from './sessionApi'
import { registerAddApi, checkExistApi } from './registerApi'
import { fetchAllApi, filterApi, getTopFiveApi } from './bookFetchApi'
import { borrowBookApi, returnBookApi } from './bookStatusApi'
import { createBookApi, removeBookApi, resetBookApi } from './bookPost'
import { fetchBookApi } from './bookDetailApi'

// Dev path
// const accountURL = 'http://localhost:5000/accounts/'
// const bookURL = 'http://localhost:5000/books/'

// Prod path
const accountURL = 'https://bkbe.herokuapp.com/accounts/'
const bookURL = 'https://bkbe.herokuapp.com/books/'

export const checkLogin = checkLoginApi(accountURL)
export const checkLogout = checkLogoutApi(accountURL)
export const validateLogin = validateLoginApi(accountURL)

export const registerAdd = registerAddApi(accountURL)
export const checkExist = checkExistApi(accountURL)

export const fetchAllBooks = fetchAllApi(bookURL)
export const applyFilter = filterApi(bookURL)
export const getTopFive = getTopFiveApi(bookURL)

export const borrowBook = borrowBookApi(bookURL)
export const returnBook = returnBookApi(bookURL)

export const createBook = createBookApi(bookURL)
export const removeBook = removeBookApi(bookURL)
export const resetBook = resetBookApi(bookURL)

export const fetchBook = fetchBookApi(bookURL)