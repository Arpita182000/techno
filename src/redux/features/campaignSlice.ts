import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Template } from "../../modals/Modals";

type campaignState = {
    productDetails: any,
    chooseOffers: any,
    selectedTemplates: any
};

const initialState: campaignState = {
    productDetails: [{
        name:'',
        description:'',
        band: [],
        category: [],
        domain: [],
        family: [],
        product: []
    }],
    chooseOffers: {
      selectedRows: []
    },
    selectedTemplates: new Template()
};

export const campaignStateSlice = createSlice({
  name: "campaignState",
  initialState,
  reducers: {
    setProductDetails: (state, action: PayloadAction<string>) => {
      state.productDetails = action.payload;
    },
    setSelectedRows: (state, action: PayloadAction<string>) => {
      state.chooseOffers.selectedRows = action.payload;
    },
    setSelctedTemplates: (state, action: PayloadAction<Record<any, any>>) => {
      state.selectedTemplates = action.payload;
    },
    resetCampaignStates: (state) => {
      state.productDetails = initialState.productDetails;
      state.chooseOffers = initialState.chooseOffers;
      state.selectedTemplates = initialState.selectedTemplates;
    }
  }
});

export const {
    setProductDetails,
    setSelctedTemplates,
    resetCampaignStates
} = campaignStateSlice.actions;

export default campaignStateSlice.reducer;