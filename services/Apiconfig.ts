const api_base_url = process.env.NEXT_PUBLIC_BASE_API_URL!  

const ApiConfig = {
    signup: `${api_base_url}/admin/signup`,
    signupGoogle: `${api_base_url}/admin/signup-google`,
    findAccount: `${api_base_url}/admin/find-account`,
    verify: `${api_base_url}/admin/verify`,
    login: `${api_base_url}/admin/login`,
    loginGoogle: `${api_base_url}/admin/login-google`,
    forgot: `${api_base_url}/admin/forgot`,
    reset: `${api_base_url}/admin/reset`,
    upload: `${api_base_url}/admin/upload`,
    onboard: `${api_base_url}/admin/onboard`,
}

export default ApiConfig;