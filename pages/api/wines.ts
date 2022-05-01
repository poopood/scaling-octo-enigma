import products from "../../data";
import type { NextApiRequest, NextApiResponse } from 'next'

type products = {
    sku: number;
    name: string;
    price: number;
    available: boolean;
    thumbnail: string;
}[]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<products>
  ) {
    res.status(200).json(products)
  }
  