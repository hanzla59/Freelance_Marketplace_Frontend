import React from 'react';

const DashboardComponent = ({ title, content, detail, bgcolor, fgcolor, onClick }) => {
  return (
    <div style={{display:'inline-block'}}>
      <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: bgcolor, color:fgcolor, padding:'15px 30px', margin:'10px', borderRadius:'5px', cursor:'pointer', boxShadow:'1px 1px 5px gray'}}>
        <h2 style={{margin:'4px 0px'}}>{title}</h2>
        <h1 style={{margin:'4px 0px'}}>{content}</h1>
        <p style={{margin:'4px 0px', fontSize:'18px'}}>{detail}</p>
      </div>
    </div>

  );
};

export default DashboardComponent;

