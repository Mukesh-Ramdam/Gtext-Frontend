import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

 export const contactApi = createApi({
    reducerPath:'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8000/api',
    }),
    endpoints:(builder) =>({
        getAllContacts:builder.query({
            query:()=>({
                url:'/contact',
                method: 'GET'
            }),
            providesTags: ['Contact'],
        }),

        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contact/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact']
        }),

        updateContact: builder.mutation({
            query: (payload) => {
              console.log(payload)
              return {
                url: '/contact',
                method: 'PUT',
                body:payload
              }
            },
            invalidatesTags: ['Contact'],
          }),
    })
})

export const {useGetAllContactsQuery, useDeleteContactMutation, useUpdateContactMutation} = contactApi