import { GetServerSideProps, NextPage } from 'next'
import React,{useState,useEffect} from 'react';
import { dataFetcher } from '../src/utils/helperFunctions';
import { winesList } from '../src/utils/types';


const Wines: NextPage<{winesList: winesList[]}>  = ({winesList} ) => {
    const [wines, setwines] = useState(winesList);
  

    /**************** #fetchdata-> fetch data on initial render ********************/
       useEffect(() => {
      (async () => {
        let data = await dataFetcher();
        setwines(data);
       })();
   }, []);

    return(
        <div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    // interface winesList {
    //     sku: number;
    //     name: string;
    //     price: number;
    //     available: boolean;
    //     thumbnail: string
    // }

    // const dataFetcher = async (url:string) => {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     return data;
    // }

    let winesList : winesList[] = await dataFetcher("http://localhost:3000/api/wines");

    return {
        props: {
          winesList,
        }, 
      };

  }


export default Wines