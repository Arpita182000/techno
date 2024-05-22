import React from 'react'
import ProductCategory from './ProductCategory'
import ProductItem from './ProductItem'

const ProductHirarchy = () => {

    const productJson = [
        {
            name: "Electronics",
            key: "electronics",
            subCategories: [
                {
                    name: "Test1",
                    key: "test1"
                },
                {
                  name: "Test2",
                  key: "test2"
                },
                {
                  name: "Test3",
                  key: "test3"
              }
            ]
        },
        {
          name: "Vehicle",
          key: "vehicle",
          subCategories: [
              {
                name: "Car",
                key: "car",
                subCategories : [
                  {
                    name: "Maruti",
                    key: "maruti",
                    subCategories : [
                      {
                        name: "Maruti",
                        key: "maruti"
                      },
                      {
                        name: "Honda",
                        key: "honda"
                      },
                    ]
                  },
                  {
                    name: "Honda",
                    key: "honda"
                  },
                ]
              },
              {
                name: "Test4",
                key: "test4"
              },
              {
                name: "Test5",
                key: "test5"
            }
          ]
      }
    ]
    
     
    
    return (<>
        {productJson.map((category, index) => (
            category.subCategories ? <ProductCategory category={category} key={category.key}/> : <ProductItem category={category} key={category.key}/>
        ))}
        </>
      )
}

export default ProductHirarchy
