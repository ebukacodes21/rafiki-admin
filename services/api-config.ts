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
    updateAccount: `${admin_base_url}/admin/update-account`,
    updatePassword: `${admin_base_url}/admin/update-password`,
    grantAccess: `${admin_base_url}/admin/grant-access`,

    // firm routes
    getAdminFirm: `${firm_base_url}/firm/private`,
    connectCalendar: `${firm_base_url}/firm/connect-calendar`,
    setPrimary: `${firm_base_url}/firm/set-primary-provider`,
    disconnectCalendar: `${firm_base_url}/firm/disconnect-calendar`,
    updateAvailability: `${firm_base_url}/firm/update-availability`,
    updateFee: `${firm_base_url}/firm/update-fee`,
    invite: `${firm_base_url}/firm/invite-lawyers`,
    connectPaystack: `${firm_base_url}/firm/connect-paystack`,
    connectStripe: `${firm_base_url}/firm/connect-stripe`,
    disconnectPayment: `${firm_base_url}/firm/disconnect-payment`,
    createMatter: `${firm_base_url}/firm/create-matter`,
    deleteMatter: `${firm_base_url}/firm/delete-matter`,
    editMatter: `${firm_base_url}/firm/edit-matter`,
}

export default apiConfig;