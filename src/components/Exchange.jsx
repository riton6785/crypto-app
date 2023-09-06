import React, { useEffect } from 'react'
import { server } from '../index'
import axios from 'axios'
import { useState } from 'react'
import { Container, HStack, VStack, Image, Heading , Text } from '@chakra-ui/react'
import Loader from './Loader'
import Errorcomponent from './Errorcomponent'

const Exchange = () => {
    const [exchanges , setExchanges] = useState([])
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(false)
    useEffect(()=>{
        const fetchexchange = async ()=>{
            try{
                const { data } = await axios.get(`${server}/exchanges`)
            
            console.log(data)
            setExchanges(data)
            setLoading(false)

            }
            catch{
                setError(true)
                setLoading(false)

            }
        }
        fetchexchange();

    },[])
    if(error){
        return <Errorcomponent message={'Error while Fetching Exchanges'}/>
    }
  return (
    <Container maxW={'container.xl'}>
        {
            loading ? ( <Loader/>) : (
                <>
                <HStack wrap={'wrap'} justifyContent='space-evenly'>
                    {
                        exchanges.map((i)=>(
                           <ExchangeCard  id={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}/> 
                        ))
                    }
                </HStack>
                </>
            )
        }

    </Container>
  )
}

const ExchangeCard =({ id,name , img , rank , url})=>(
    <a href={url} target={'blank'} >
        <VStack
         w={'52'} 
         shadow={'lg'}
          p={'8'}
          borderRadius={'lg'}
          transition={'all 0.3s'} 
          m={'4'} 
          css={{
            "&:hover":{
                transform:"scale(1.1)"
            }
          }}
         
          >

            <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt={'Exchange'} />

            <Heading size={'md'} noOfLines={1}>
                {rank}
            </Heading>

            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
)
export default Exchange