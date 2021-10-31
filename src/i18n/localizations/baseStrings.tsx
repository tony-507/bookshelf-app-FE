const baseStrings = {
  /* Routes */
  'routes.landBookshelf': '/',
  'routes.home': '/public',
  'routes.user': '/user',
  'routes.admin': '/admin',
  'routes.bookDetail': '/bookDetail/:id',
  'routes.error': '/error',

  /* Page content */
  
  // Login page
  'app_title': 'Book Management System',
  'loginPrompt': 'Please login to proceed',
  'username': 'Username',
  'password': 'Password',
  'pw_req': 'at least 8 characters',
  'email': 'Email',
  'loginBtn': 'Login',
  'logoutBtn': 'Logout',
  'newUserBtn': 'New?',
  'existUserBtn': 'Existing user?',
  'registerUserBtn': 'Register',
  'footer': 'By Tony Chan',
  'changeLang': '中文',
  'confirmPassword': 'Input the password again',
  'login_message': 'If you are an existing user, please login to proceed.\nOtherwise you may register for a new account.',
  'register_message': 'Please register by email.',

  // Staff page
  'enterXXX': 'Enter ',
  'welcomeMessage': 'Welcome ',
  'addBook': 'Add the book',
  'resetList': 'Reset books list',

  // Table books
  'title': 'TITLE',
  'author': 'AUTHOR',
  'rating': 'RATING',
  'genre': 'GENRE',
  'description': 'DESCRIPTION',
  'status': 'STATUS',
  'On Shelf': 'On Shelf',
  'Not On Shelf': 'Not On Shelf',
  'Borrowed by': 'Borrowed by {user}',
  'Borrowed': 'Borrowed',
  'Remove book': 'Remove book',
  'Borrow book': 'Borrow book',
  'Return book': 'Return book',

  // User page
  'Quick Filters': 'Quick Filters',
  'All': 'All',
  'Apply Filters': 'Apply Filters'
}

export type LanguageStrings = typeof baseStrings
export const en = baseStrings