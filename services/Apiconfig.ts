const api_base_url = process.env.NEXT_PUBLIC_BASE_API_URL!  

const ApiConfig = {
    signup: `${api_base_url}/admin/signup`,
    signupGoogle: `${api_base_url}/admin/signup-google`,
    verify: `${api_base_url}/admin/verify`,
    login: `${api_base_url}/admin/login`,
    forgot: `${api_base_url}/admin/forgot`,
    reset: `${api_base_url}/admin/reset`,
    updateadmin: `${api_base_url}/user/update-user`,
    updatePassword: `${api_base_url}/user/update-password`,

    getLoanTypes: `${api_base_url}/loan/get-loan-types`,
    upload: `${api_base_url}/loan/upload-file`,
    requestLoan: `${api_base_url}/loan/request-loan`,
    getUserLoans: `${api_base_url}/loan/get-user-loans`,
    deposit: `${api_base_url}/loan/deposit`,
}

export default ApiConfig;