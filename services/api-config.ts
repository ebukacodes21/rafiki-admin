const admin_base_url = process.env.NEXT_PUBLIC_ADMIN_API_URL!
const firm_base_url = process.env.NEXT_PUBLIC_FIRM_API_URL!  

const apiConfig = {
    // admin routes
    signup: `${admin_base_url}/admin/signup`,
    signupGoogle: `${admin_base_url}/admin/signup-google`,
    findAccount: `${admin_base_url}/admin/find-account`,
    verify: `${admin_base_url}/admin/verify`,
    login: `${admin_base_url}/admin/login`,
    loginGoogle: `${admin_base_url}/admin/login-google`,
    forgot: `${admin_base_url}/admin/forgot`,
    reset: `${admin_base_url}/admin/reset`,
    upload: `${admin_base_url}/admin/upload`,
    onboard: `${admin_base_url}/admin/onboard`,

    // admin firm routes
    getAdminFirm: `${firm_base_url}/firm/private`,
    connectCalendar: `${firm_base_url}/firm/connect-calendar`,
    updateAvailability: `${firm_base_url}/firm/update-availability`,
}

export default apiConfig;