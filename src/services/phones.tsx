import { mainApi } from "./main";

export const phoneApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPhoneSpecs: builder.query({
      keepUnusedDataFor: 0,
      query: (pid) => {
        return {
          url: `/phones/${pid}/specs`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.specs;
      },
    }),

    getSimilarPhones: builder.query({
      keepUnusedDataFor: 0,

      query: (pid) => {
        return {
          url: `/phones/${pid}/similar`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.phones;
      },
    }),

    getAllPhones: builder.query({
      keepUnusedDataFor: 0,
      query: ({ round, companyId }) => {
        return {
          url: companyId
            ? `/phones/by/${companyId}?round=${round}`
            : `/phones/all?round=${round}`,
          method: "GET",
        };
      },
      transformResponse: (response: { phones: any }) => {
        return response.phones;
      },
    }),

    // getExactCompanyPhones: builder.query({
    //   keepUnusedDataFor: 0,
    //   query: ({ round, companyId }) => {
    //     return {
    //       url: `/phones/by/${companyId}?round=${round}`,
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response: { phones: any }) => {
    //     return response.phones;
    //   },
    // }),

    getAllCompanies: builder.query({
      keepUnusedDataFor: 0,
      query: (round) => {
        return {
          url: `/companies/all?round=${round}`,
          method: "GET",
        };
      },

      transformResponse: (response: { companies: any }) => {
        return response.companies;
      },
    }),

    getStatisticalInfo: builder.query({
      keepUnusedDataFor: 0,
      query: (pid) => {
        return {
          url: `/phones/${pid}/stats`,
          method: "GET",
        };
      },
      providesTags: ["phoneStats"],
      transformResponse: (response: any) => {
        return response.stats;
      },
    }),

    getManufacturingCompany: builder.mutation({
      query: (pid) => {
        return {
          url: `/phones/${pid}/company`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.company;
      },
    }),

    indicateUserComparing: builder.mutation({
      query: ({ pid1, pid2 }) => {
        return {
          url: `/phones/${pid1}/compare/${pid2}`,
          method: "PUT",
        };
      },
      transformResponse: (response: any) => {
        return response.company;
      },
    }),

    verifyOwnedPhone: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/phones/${id}/verify`,
          method: "PUT",
        };
      },
    }),
  }),
});

//auto-generated hooks
export const {
  useGetPhoneSpecsQuery,
  useGetSimilarPhonesQuery,
  useGetAllPhonesQuery,
  useGetManufacturingCompanyMutation,
  useGetStatisticalInfoQuery,
  useIndicateUserComparingMutation,
  useGetAllCompaniesQuery,
  useVerifyOwnedPhoneMutation,
  // useGetExactCompanyPhonesQuery,
} = phoneApi;
