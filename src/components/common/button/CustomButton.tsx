import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React from "react";
import colorConfigs from "../../../configs/colorConfigs";

interface ICustomButtonProps extends ButtonProps {
	is_loading?: boolean;
}

const CustomButton = (props: ICustomButtonProps) => {
	let _props = { ...props, is_loading: undefined };
	return (
		<Button
			sx={{ textTransform: "capitalize",}}
			// fullWidth
			variant="outlined"
			endIcon={
				props.is_loading ? (
					<CircularProgress size={22} color="inherit" />
				) : (
					props.endIcon
				)
			}
			disabled={props?.is_loading || props?.disabled}
			{..._props}
		>
			{props.children}
		</Button>
	);
};

export default CustomButton;
