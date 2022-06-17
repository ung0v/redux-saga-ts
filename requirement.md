# Mini Project - Student Management

/login
/admin

/admin/\*
/admin/dashboard
/admin/students

auth / authentication

- login
- sign up / register

CLICK LOGIN

- CALL API TO LOGIN
- Sucess --> redirect to ADMIN
- FAILED --> show ERROR

LOGIN
LOGOUT

authSaga

LOOP

- if logged in, watch LOGOUT
- else watch LOGIN

LOGIN

- call login API to get token + user info
- set token to local storage
- redirect to admin page

LOGOUT

- clear token from local storage
- redirect to login page

authSlice
authSaga
