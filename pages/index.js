import React from "react"

import { client } from "../lib/client"

import { FooterBanner, HeroBanner, Product } from "../components"

const Home = ({ products, banner }) => {
  return (
    <>
      <HeroBanner HeroBanner={banner.length && banner[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      <FooterBanner footerBanner={banner.length && banner[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery)

  const bannerQuery = '*[_type == "banner"]'
  const banner = await client.fetch(bannerQuery)
  return {
    props: { products, banner },
  }
}

export default Home
