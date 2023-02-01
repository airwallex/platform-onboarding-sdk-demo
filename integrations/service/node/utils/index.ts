export const generateAccountData = (): Record<string, unknown> => {
  return {
    primary_contact:{
        email: 'onboarding-sdk-sample-account@email.com'
    },
    account_details:{
      business_details: {
        address: {
          country_code: 'AU',
        },
      },
    },
    customer_agreements: {
        agreed_to_terms_and_conditions: true,
        agreed_to_data_usage: true,
        opt_in_for_marketing: true
    },
  };
};
