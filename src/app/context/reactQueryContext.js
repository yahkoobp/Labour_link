'use client'

import { QueryClient , QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

const TanStackProvider = ({children}) =>{
    const queryClient = new QueryClient()
     return (
        <QueryClientProvider client={queryClient}>
            {children}
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
        </QueryClientProvider>
     )
}
export default TanStackProvider