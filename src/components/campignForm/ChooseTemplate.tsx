import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import image from '../../assets/images/offer.jpg'
import React, { useEffect, useState } from 'react'
import './campign.style.css'
import CustomDialogBox from '../common/dialogBox/CustomDialogBox'
import EmailTemplate from '../template/EmailTemplate'
import TextEditor from './TextEditor'

import { ApiService, getURL } from '../../api'
import SmsTemplate from '../template/SmsTemplate'
import WhatsAppTemplate from '../template/WhatsAppTemplate'
import { isNullOrEmptyObject } from '../../utils/helperFunctions'
import { API_ADDRESS } from '../../api/apiConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setSelctedTemplates } from '../../redux/features/campaignSlice'
import { RootState } from '../../redux/store'


const ChooseTemplate = ({selectedSms, setSelectedSms, selectedEmail, setSelectedEmail ,setSelectedWhatsApp,selectedWhatsApp}: any) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditorDialog, setOpenEditorDialog] = useState(false);
    const [template, setTemplate] = useState<any>(null)
    const { selectedTemplates } = useSelector((state: RootState) => state.campaignState);
    const [selectedTemplate, setSelectedTemplate] = useState<Record<string, any>>(selectedTemplates);
    const [emailTemplateData, setEmailTemplateData] = useState<any>([]);
    const [smsData,setSmsData] = useState<any>([]);
    const [editorSubject, setEditorSubject] = useState<string>('');
    const[editorImage,setEditorImage] = useState<string>('');
    const [templateType, setTemplateType] = useState<string>('');
    const[editorBodysms,setEditorBodysms] = useState<string>('');
    const[editorSubjectsms,setEditorSubjectsms] = useState<string>('');
    const [whatsAppData,setWhatsAppData] = useState<any>([]);
    const [editorContent, setEditorContent] = useState<string>(selectedTemplates[templateType]?.design ?? selectedTemplates[templateType]?.body ?? "");

    const dispatch = useDispatch();

    useEffect(() => {
        fetchEmailTemplate();
        fetchSmsData();
        fetchWhatsAppData();
    }, [])
    const fetchEmailTemplate = async () => {
        try {
            const result = await ApiService.callGetApi(
                getURL(API_ADDRESS.templateEmail)
                );
            setEmailTemplateData(result);

        } catch (error: any) {
            console.error('Error fetching data:', error.message);
        }
    };


    const fetchWhatsAppData = async () => {
        try {
          const result = await ApiService.callGetApi(
            getURL(API_ADDRESS.getWhatsapp)

          );
          console.log("result111", result);
          setWhatsAppData(result);

        } catch (error: any) {
          console.error('Error fetching data:', error.message);
        }
      };

    
    const fetchSmsData = async () => {
        try {
          const result = await ApiService.callGetApi(
            getURL(API_ADDRESS.templateSms)
            );
          console.log("result111", result);
          setSmsData(result);
          
        } catch (error: any) {
          console.error('Error fetching data:', error.message);
        }
      };


    const handleDialogOpen = (template: any, templateType: string) => {
        // setSelectedTemplate({ ...selectedTemplate, [templateType]: template });
        setTemplate(template);
        templateType === "emailTemplate" || templateType === "whatsAppTemplate" || templateType === "smsTemplate" ? setOpenDialog(true) : setOpenEditorDialog(true);
    };
    const handleEditorDialogOpen = (template: any, templateType: string) => {
        setTemplateType(templateType);
        setOpenEditorDialog(true);

    }
    const handleEditorDialogClose = () => {
        setOpenEditorDialog(false);
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleWhatsAppClick = (selectedItem: any) => {
        setSelectedWhatsApp(selectedItem.subject);
        dispatch(setSelctedTemplates({...selectedTemplates, whatsAppTemplate: selectedItem}))
        setSelectedTemplate({...selectedTemplates, whatsAppTemplate: selectedItem} )
        const {body,subject} = getSelectedData(selectedItem._id, whatsAppData);

        // setEditorBodysms(body);
        // setEditorSubjectsms(subject);
        setEditorContent(body);
        setEditorSubject(subject);

        setOpenDialog(false);
        console.log("calling selectedTemplates",selectedTemplates, templateType);
    };
    

    const handleEmailClick = (selectedItem: any) => {
        setSelectedEmail(selectedItem);
        dispatch(setSelctedTemplates({...selectedTemplates, emailTemplate: selectedItem}));
        setSelectedTemplate({...selectedTemplates, emailTemplate: selectedItem} )
        const {design, subject,image} = getSelectedData(selectedItem._id, emailTemplateData);
        setEditorImage(image);
        setEditorContent(design);
        setEditorSubject(subject);
        setOpenDialog(false);
    };

    const handleSmsClick = (selectedItem: any) => {
        setSelectedSms(selectedItem.subject);
        dispatch(setSelctedTemplates({...selectedTemplates, smsTemplate: selectedItem}))
        setSelectedTemplate({...selectedTemplates, smsTemplate: selectedItem} )
        const {body,subject} = getSelectedData(selectedItem._id, smsData);
        
        // setEditorBodysms(body);
        // setEditorSubjectsms(subject);
        setEditorContent(body);
        setEditorSubject(subject);

        setOpenDialog(false);
        console.log("calling selectedTemplates",selectedTemplates, templateType);
    };

    const getSelectedData = (id: string, data: any=[]) => {
        return data.find((item: any) => item._id == id);
    }

    const cardData = [
        {
            id: 'emailTemplate',
            title: 'Email Templates',
            template: <EmailTemplate handleEmailClick={handleEmailClick} emailTemplateData={emailTemplateData}
            //  setSelectedTemplate={setSelectedTemplate}
            //  selectedTemplate={selectedTemplate}
            //     setSelectedEmail={setSelectedEmail}
            //     //  templateType='emailTemplate'
            //     setOpenDialog={setOpenDialog} setEmailTemplateData={setEmailTemplateData}
            />
        },
        {
            id: 'whatsAppTemplate',
            title: 'WhatsApp Templatses',
            template: <WhatsAppTemplate  whatsAppData={whatsAppData} handleWhatsAppClick={handleWhatsAppClick}/>
        },
        {
            id: 'smsTemplate',
            title: 'SMS Templates',
            template: <SmsTemplate handleSmsClick={handleSmsClick} smsData={smsData}/>
        }

    ]



    const submitEditorCampaign = async () => {
        console.log("selectedTemplates", selectedTemplates);

        const payload: any = {
            id: localStorage.getItem("campaignId"),
            template: {
              email: {
                subject: templateType === 'emailTemplate' ? editorSubject : selectedTemplates.emailTemplate.subject,
                body: templateType === 'emailTemplate' ? editorContent : selectedTemplates.emailTemplate.design
              },
              whatsapp: {
                subject: templateType === 'whatsAppTemplate' ? editorSubject : selectedTemplates.whatsAppTemplate.subject,
                body: templateType === 'whatsAppTemplate' ? editorContent :selectedTemplates.whatsAppTemplate.body
              },
              sms: {
                subject: templateType === 'smsTemplate' ? editorSubject : selectedTemplates.smsTemplate.subject,
                body: templateType === 'smsTemplate' ? editorContent :selectedTemplates.smsTemplate.body
              }
            }
          }
        const response = await ApiService.editorputApi(
        getURL(API_ADDRESS.templateCampign), payload)
      }

    function handleEmailTemplateSubmit() {
        handleEditorChange();
        // handleEditorContent();
        submitEditorCampaign();
        handleEditorDialogClose();
    }

    const handleEditorChange = () => { //selectedTemplates.emailTemplate.subject
        if(templateType === 'emailTemplate') {
            dispatch(setSelctedTemplates({...selectedTemplates, emailTemplate: {...selectedTemplates.emailTemplate, design: editorContent, subject: editorSubject}}));
        } else if(templateType === 'smsTemplate') {
            dispatch(setSelctedTemplates({...selectedTemplates, smsTemplate: {...selectedTemplates.smsTemplate, body: editorContent, subject: editorSubject}}))
        } else if(templateType === 'whatsAppTemplate') {
            dispatch(setSelctedTemplates({...selectedTemplates, whatsAppTemplate: {...selectedTemplates.whatsAppTemplate, body: editorContent, subject: editorSubject}}))
        }
    }

    // const handleEditorContent = () => {
    //     if(templateType === 'emailTemplate') {
    //         dispatch(setSelctedTemplates({...selectedTemplates, emailTemplate: {...selectedTemplates.emailTemplate, design: editorContent}}));
    //     } else if(templateType === 'smsTemplate') {
    //         dispatch(setSelctedTemplates({...selectedTemplates, smsTemplate: {...selectedTemplates.smsTemplate, body: editorContent}}))
    //     } else if(templateType === 'whatsAppTemplate') {
    //         dispatch(setSelctedTemplates({...selectedTemplates, whatsAppTemplate: {...selectedTemplates.whatsAppTemplate, body: editorContent}}))
    //     }
    // }



    return (
        <>
            <Grid container spacing={3} p={3}>
                {cardData.map((item, index) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <div className="image-container">
                            <Card sx={{ height: 'auto', borderRadius: '1rem', }} className="custom-card" >
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {
                                        isNullOrEmptyObject(selectedTemplate?.[item.id]) ?
                                        <img src={image} alt='Image' style={{ width: '100%', height: '300px', padding: '1rem' }} className="image" /> :
                                        <>
                                        {isNullOrEmptyObject(selectedTemplate?.[item.id]?.image) ?  <img src={image} alt='Image' style={{ width: '100%', height: '300px', padding: '1rem' }} className="image" />
                                        :
                                        <img src={selectedTemplate[item.id].image} alt='Image' style={{ width: '100%', height: '300px', padding: '1rem' }} className="image" />
                                        }
                                        
                                        <p style={{textAlign:'center'}}>{selectedTemplate[item.id].subject}</p>
                                        </>
                                    }
                                    {/* {!isNullOrEmptyObject(selectedTemplate?.[item.id]) ? '' : */}
                                        <div className="overlay">
                                            <Button variant="outlined" sx={{
                                                color: 'white', border: '1px solid white', '&:hover': {
                                                    borderColor: 'white',
                                                }, borderRadius: '1rem'
                                            }} className="button"
                                                onClick={() => handleDialogOpen(item.template, item.id)}
                                            >
                                                Choose template
                                            </Button>
                                            <Typography variant="body2" align="center" className="text">
                                                Some text
                                            </Typography>
                                        </div>
                                    {/* } */}
                                    {!isNullOrEmptyObject(selectedTemplate?.[item.id]) && <Button sx={{ borderRadius: '1rem', border: '1px solid black' }}
                                        onClick={() => handleEditorDialogOpen(item.template, item.id)}
                                    > Enter Subject Matter
                                    </Button>}
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', padding: '1rem', marginTop: '0.5rem' }} >
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <CustomDialogBox open={openDialog} handleClose={handleDialogClose}>{template}</CustomDialogBox>
            <CustomDialogBox 
                customButton={'Submit'}
                handleCustomClick={handleEmailTemplateSubmit}
                open={openEditorDialog}
                handleClose={handleEditorDialogClose}
            >
                {<TextEditor 
                    // editorImage={}
                    setEditorSubject={setEditorSubject}
                    selectedTemplates={selectedTemplates}
                    templateType={templateType}
                    editorSubject={editorSubject}
                    editorImage={editorImage} 
                    // setEditorImage={setEditorImage}
                    // editorContent={selectedTemplates[templateType]?.design ?? selectedTemplates[templateType]?.body ?? ""} 
                    editorContent={editorContent}
                    setEditorContent={setEditorContent} 
                />}
            </CustomDialogBox>

        </>
    )
}

export default ChooseTemplate
