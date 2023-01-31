export const getRandomInt = (): number => {
  const min = 1;
  const max = 99999;
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

export const generateAccountData = (): Record<string, unknown> => {
  const randomEmail = `onboarding-sdk-demo+testhfstaging${getRandomInt()}@airwallex.com`;
  return {
    account_details: {
      attachments: {
        additional_files: [],
      },
      authorised_person_details: {
        attachments: {
          identity_files: [
            {
              file_id: '58b0b974-45c7-4c03-a2c6-3def2b09f898',
              tag: 'PASSPORT',
            },
          ],
        },
        filling_as: 'LEGALREP',
        first_name: 'John',
        first_name_english: 'John_EN',
        identification_expire_at: '2026-12-10',
        identification_number: 'M1234567',
        identification_type: 'PASSPORT',
        last_name: 'Smith',
        last_name_english: 'John_EN',
        nationality: 'AU',
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
                file_id: '58b0b974-45c7-4c03-a2c6-3def2b09f898',
                tag: 'PASSPORT',
              },
            ],
          },
          date_of_birth: '2000-11-11',
          first_name: 'John',
          first_name_english: 'John_EN',
          identification_expire_at: '2026-12-10',
          identification_number: 'M1234567',
          identification_type: 'PASSPORT',
          last_name: 'Smith',
          last_name_english: 'John_EN',
          nationality: 'AU',
        },
      ],
      business_details: {
        address: {
          country_code: 'AU',
          postcode: '6148',
          state: 'WA',
        },
        address_english: {
          address_line1: '200 Collins Street',
          country_code: 'AU',
          postcode: '6148',
          state: 'NSW',
          suburb: 'St Leonards',
        },
        as_trustee: true,
        attachments: {
          business_documents: [
            {
              description: 'image-test.png',
              file_id: 'c0d3f5a7-fe51-4869-bc35-7aa5abc0e92d',
              tag: 'OTHER',
            },
            {
              description: 'image-test.png',
              file_id: 'cd10b321-df1b-48c0-bf96-3c2d50a71cd4',
              tag: 'TRUST_DEED',
            },
          ],
        },
        business_address: null,
        business_name: 'MD STAR PTY LTD',
        business_name_english: 'business_name_english',
        business_name_trading: null,
        business_registration_number: '15604464342',
        business_structure: 'COMPANY',
        contact_number: '113412342',
        description_of_goods_or_services: 'dog food',
        description_of_industry: null,
        industry_category: 'E-Commerce - Merchant',
        industry_category_level3: 'Computer, communication, consumer electronics and related accessories',
        industry_sub_category: 'E-Commerce - Merchant',
        operating_country: ['AU', 'JE'],
        purpose: null,
        tax_id: null,
        trust_name: null,
        url: 'https://test.com',
        vat_numbers: [],
      },
      controlling_person_details: {
        attachments: {
          identity_files: [],
        },
      },
      director_details: [],
      legal_rep_details: {
        attachments: {
          identity_files: [],
        },
      },
      trustee_details: null,
      individual_details: null,
      legal_entity_type: 'BUSINESS',
    },
    account_usage: {
      card_usage: ['PERSONAL_SPENDING'],
      collection_country_codes: ['US', 'AU'],
      collection_from: ['TOP_UP_FROM_BANK_ACCOUNT_UNDER_SAME_NAME', 'MARKETPLACES'],
      expected_monthly_transaction_volume: {
        amount: '50000.0',
      },
      payout_country_codes: ['HK', 'CN'],
      payout_to: ['CONNECTED_AWX_ACCOUNT'],
    },
    customer_agreements: {
      agreed_to_data_usage: true,
      agreed_to_terms_and_conditions: true,
      opt_in_for_marketing: true,
    },
    primary_contact: {
      attachments: {
        identity_files: [],
      },
      email: randomEmail,
      platform_connected_notification: {
        notification_tag: 'NOTIFY_BILATERAL',
      },
    },
    status: 'SUBMITTED',
    view_type: 'COMPLETE',
  };
};
