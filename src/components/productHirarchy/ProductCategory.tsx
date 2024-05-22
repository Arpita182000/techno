import { Collapse, List } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import ProductItem from "./ProductItem";

const ProductCategory = ({ category }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <div onClick={(e: any) => {
            console.log("calling me");
            e.stopPropagation();
            setOpen(!open)
            }}>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
               
                <ArrowDropDownIcon />
                <p>{category.name}</p>
            </div>
            <Collapse in={open} timeout="auto">
                <List style={{ paddingLeft: '20px' }}>
                    {category.subCategories.map((category: any, index: number) => (
                        category.subCategories ? <ProductCategory category={category} key={category.key} /> : <ProductItem category={category} key={category.key} />
                    ))}

                </List>
            </Collapse>
        </div>
    )
}

export default ProductCategory;