import React from 'react';
import { Widget } from 'react-cloudinary-upload-widget';

const FileUpload = ({
  folder,
  resourceType,
  text,
  successCallBack,
  failureCallBack,
}) => {
  return (
    <div>
      <Widget
        sources={['local', 'camera']}
        resourceType={resourceType}
        cloudName='ortiz0505'
        uploadPreset='fnfu6lvi'
        buttonText={text}
        style={{
          color: '#E6F4F1',
          border: 'none',
          width: '120px',
          padding: '4px',
          backgroundColor: '#306D81',
          borderRadius: '8px',
          height: '40px',
        }}
        folder={folder}
        cropping={false}
        autoClose={false}
        onSuccess={successCallBack}
        onFailure={failureCallBack}
        logging={false}
        widgetStyles={{
          palette: {
            window: '#737373',
            windowBorder: '#FFFFFF',
            tabIcon: '#FF9600',
            menuIcons: '#D7D7D8',
            textDark: '#DEDEDE',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#B3B3B3',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#909090',
          },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
              active: true,
            },
          },
        }}
        destroy
        apiKey={981183365229474}
      />
    </div>
  );
};

export default FileUpload;
