import { API_ADDRESS } from "./apiConfig";

export { default as ApiService } from "./services/ApiService";

export const LOCALHOST = "http://localhost:9001";
// export const LOCALHOST = "http://128.199.25.94:80";

export const 
getURL = (urlName: string) => {
  switch (urlName) {
    case API_ADDRESS.dashBoardApi:
      return `${LOCALHOST}/api/dashboard/modes`
    case API_ADDRESS.sendApproval:
      return `${LOCALHOST}/api/campaign/approval`
    case API_ADDRESS.getCampaignData:
      return `${LOCALHOST}/api/campaign`
    case API_ADDRESS.getCampaignStatus:
      return `${LOCALHOST}/api/campaign/status`
    case API_ADDRESS.addCampaignData:
      return `${LOCALHOST}/api/campaign`
    case API_ADDRESS.campaignAdded:
      return `${LOCALHOST}/api/campaign/stores/search/added`
    case API_ADDRESS.createCampaign:
      return `${LOCALHOST}/api/campaign/create`
    case API_ADDRESS.addGroupCampaign:
      return `${LOCALHOST}/api/campaign/group/add`;
    case API_ADDRESS.campaign:
      return `${LOCALHOST}/api/campaign`;
    case API_ADDRESS.addCampaignStore:
      return `${LOCALHOST}/api/campaign/stores/add`;
    case API_ADDRESS.deleteCampaignStore:
      return `${LOCALHOST}/api/campaign/stores/delete`;
    case API_ADDRESS.deleteGroupCampaign:
      return `${LOCALHOST}/api/campaign/group/delete`;
    case API_ADDRESS.getScheduleCampaign:
      return `${LOCALHOST}/api/campaign/schedule/get`;
    case API_ADDRESS.groupCampaign:
      return `${LOCALHOST}/api/campaign/group`;
    case API_ADDRESS.toggleMode:
      return `${LOCALHOST}/api/campaign/schedule/mode`  
    case API_ADDRESS.offer:
      return `${LOCALHOST}/api/offer`;
    case API_ADDRESS.campaignOffer:
      return `${LOCALHOST}/api/campaign/offer`;
    case API_ADDRESS.scheduleCampaign:
      return `${LOCALHOST}/api/campaign/schedule`;
    case API_ADDRESS.searchCampaign:
      return `${LOCALHOST}/api/campaign/search`;
    case API_ADDRESS.searchCampaignStore:
      return `${LOCALHOST}/api/campaign/stores/search`;
    case API_ADDRESS.searchStore:
      return `${LOCALHOST}/api/stores/search`;
    case API_ADDRESS.store:
      return `${LOCALHOST}/api/stores`;
    case API_ADDRESS.templateCampign:
      return `${LOCALHOST}/api/campaign/template`;
    case API_ADDRESS.templateSms:
      return `${LOCALHOST}/api/templates/sms?skip=0&limit=10`;
    case API_ADDRESS.templateEmail:
      return `${LOCALHOST}/api/templates/email`;
    case API_ADDRESS.addUser:
      return `${LOCALHOST}/api/user/add`;
    case API_ADDRESS.viewUser:
      return `${LOCALHOST}/api/user`;
      case API_ADDRESS.userDetails:
      return `${LOCALHOST}/api/user/get`;
      case API_ADDRESS.updateUser:
      return `${LOCALHOST}/api/user/update`;
    case API_ADDRESS.addAccountType:
      return `${LOCALHOST}/api/user/accounttype/add`;
    case API_ADDRESS.accountType:
      return `${LOCALHOST}/api/user/accounttypes`;
    case API_ADDRESS.createOffer:
      return `${LOCALHOST}/api/offer/create`;
    case API_ADDRESS.viewOffer:
      return `${LOCALHOST}/api/offer`;
      case API_ADDRESS.OfferDetails:
      return `${LOCALHOST}/api/offer/get`;
      case API_ADDRESS.editOffer:
        return `${LOCALHOST}/api/offer/update`;
    case API_ADDRESS.campaignSubmit:
      return `${LOCALHOST}/api/campaign`;
    case API_ADDRESS.getWhatsapp:
      return `${LOCALHOST}/api/templates/whatsapp?skip=0&limit=10`;
    case API_ADDRESS.previewDetails:
      return `${LOCALHOST}/api/campaign/stores/search/all`;
    case API_ADDRESS.addOffer:
      return `${LOCALHOST}/api/campaign/offer`;
    case API_ADDRESS.editStore:
      return `${LOCALHOST}/api/stores/get`;
      case API_ADDRESS.deleteStore:
      return `${LOCALHOST}/api/stores/delete`;
    case API_ADDRESS.deleteOffer:
      return `${LOCALHOST}/api/offer/delete`;
    case API_ADDRESS.deleteUser:
      return `${LOCALHOST}/api/user/delete`;
    case API_ADDRESS.updateStore:
      return `${LOCALHOST}/api/stores/update`;
    case API_ADDRESS.imageUpload:
      return `${LOCALHOST}/api/image/upload`;
                                          
    default:
      return "";
  }
};
