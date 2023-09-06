import React, { useEffect } from 'react'
import { server } from '../index'
import axios from 'axios'
import { useState } from 'react'
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import Errorcomponent from './Errorcomponent'
import CoinCard from './CoinCard' 

const Coins = () => {
    const [coins , setCoins] = useState([])
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(false)
    const [ page, setPage] = useState(1)
    const [currency , setCurrency] = useState('inr')
    const btn = new Array(132).fill(1);
    const currencysymbol= currency==='inr'?"₹":currency==="eur"? "€":"$"
    const changepage=(page)=>{
        setPage(page)
        setLoading(true)
    }
    useEffect(()=>{
        const fetchexchange = async ()=>{
            try{
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
            
            console.log(data)
            setCoins(data)
            setLoading(false)

            }
            catch{
                setError(true)
                setLoading(false)

            }
        }
        fetchexchange();

    },[currency,page])
    if(error){
        return <Errorcomponent message={'Error while Fetching coins'}/>
    }
  return (
    <Container maxW={'container.xl'}>
        {
            loading ? ( <Loader/>) : (
                <>
                <RadioGroup value={currency} onChange={setCurrency }>
                    <HStack>
                       <Radio value='inr'>INR</Radio>
                       <Radio value='usd'>USD</Radio>
                       <Radio value='eur'>EUR</Radio>
                    </HStack>
                </RadioGroup>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {
                        coins.map((i)=>(
                           <CoinCard 
                           id={i.id}
                           key={i.id}
                           price={i.current_price}
                           name={i.name} 
                           img={i.image}
                           symbol={i.symbol}
                           currencysymbol={currencysymbol}
                           url={i.url} /> 
                        ))
                    }
                </HStack>
                <HStack overflowX={'auto'} p={'8'} w={'full'}>
                    {
                        btn.map((item,index)=>(
                            <Button 
                            key={index}
                    bgColor={'blackAlpha.900'}
                    color={'white'}
                    onClick={()=>changepage(index+1)}>
                      {index+1}
                    </Button>

                        ))
                    }
                </HStack>
                </>
            )
        }

    </Container>
  )
}


export default Coins