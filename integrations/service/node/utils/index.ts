export const generateAccountData = (): Record<string, unknown> => {
  const randomEmail = `onboarding-sdk@email.com`;
  return {
    primary_contact:{
        email: randomEmail
    },
    account_details:{
      business_details: {
        address: {
          country_code: 'AU',
          state: 'NSW',
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
