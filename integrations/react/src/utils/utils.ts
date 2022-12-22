export const getRandomInt = (): number => {
  const min = 1;
  const max = 99999;
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

export const generateAccountData = (): Record<string, unknown> => {
  const randomEmail = `platform_sdk_testing_${getRandomInt()}@airwallex.com`;
  return {
    primary_contact: {
      email: randomEmail,
    },
    account_details: {
      business_details: {
        attachments: {
          business_documents: [
            {
              description: 'aaa.pdf',
              file_id: 'efc9945a-527e-4f25-81b0-a5b25725a002',
              tag: 'ASIC_CURRENT_COMPANY_EXTRACT',
            },
            {
              description: 'bbb.pdf',
              file_id: 'efc9945a-527e-4f25-81b0-a5b25725a002',
              tag: 'CERTIFICATION_REGISTRATION',
            },
          ],
        },
        address: {
          address_line1: '669 Bartell Estate',
          address_line2: '',
          country_code: 'AU',
          postcode: '2065',
          state: 'NSW',
          suburb: 'Greensboro',
        },
        address_english: {
          address_line1: '200 Collins Street',
          country_code: 'AU',
          postcode: '2065',
          state: 'NSW',
          suburb: 'St Leonards',
        },
        business_name: 'Collier, Bernhard and Cartwright',
        business_name_english: 'business_name_english',
        business_registration_number: '1098762872',
        business_structure: 'SOLE_PROPRIETOR',
        industry_category: 'Education',
        industry_sub_category: 'Educational Service',
        industry_category_level3: 'Early Child Care',
        description_of_industry: 'test',
        description_of_goods_or_services: 'test',
        contact_number: '113412342',
        operating_country: ['AU', 'JE'],
        url: 'https://test.com',
      },
      beneficial_owners: [
        {
          address: {
            address_line1: '123412342',
            address_line2: 'AAA',
            country_code: 'AU',
            postcode: '2065',
            state: 'NSW',
            suburb: 'Victoria',
          },
          attachments: {
            identity_files: [
              {
                file_id: 'efc9945a-527e-4f25-81b0-a5b25725a002',
                tag: 'PASSPORT',
              },
            ],
          },
          date_of_birth: '2000-11-11',
          first_name: 'John',
          first_name_english: 'John_EN',
          middle_name: 'PASS',
          middle_name_english: 'PASS_EN',
          last_name: 'Smith',
          last_name_english: 'John_EN',
          identification_number: '55555555',
          identification_type: 'PASSPORT',
          nationality: 'AU',
        },
      ],
    },
    account_usage: {
      card_usage: ['PERSONAL_SPENDING'],
      collection_country_codes: ['US', 'AU'],
      collection_from: ['TOP_UP_FROM_BANK_ACCOUNT_UNDER_SAME_NAME', 'MARKETPLACES'],
      payout_country_codes: ['HK', 'CN'],
      payout_to: ['CONNECTED_AWX_ACCOUNT'],
    },
    customer_agreements: {
      agreed_to_terms_and_conditions: true,
      agreed_to_data_usage: true,
      opt_in_for_marketing: true,
    },
    metadata: {
      id: 'test1234',
    },
  };
};
